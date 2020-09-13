package org.example.service.impl;

import org.example.constant.ErrorMessageConstants;
import org.example.dao.UserRepository;
import org.example.input.LoginInput;
import org.example.input.RegisterInput;
import org.example.model.User;
import org.example.security.JwtProvider;
import org.example.service.api.AuthService;
import org.example.type.RoleType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;
import java.util.Collections;

@Service
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtProvider jwtProvider;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public String issueToken(LoginInput loginInput) throws AuthenticationException {
        String username = loginInput.getUsername();
        User user = userRepository.findByUsername(username);
        boolean isValidCredential = user != null && BCrypt.checkpw(loginInput.getPassword(), user.getPassword());
        if (isValidCredential) {
            return jwtProvider.createToken(username, Collections.singletonList(user.getRole()));
        } else {
            throw new AuthenticationException("Invalid Credential");
        }
    }

    @Override
    public String issueToken(String username) throws AuthenticationException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new AuthenticationException();
        }
        return jwtProvider.createToken(username, Collections.singletonList(user.getRole()));
    }

    @Override
    public void register(RegisterInput registerInput) {
        if (userRepository.existsByEmail(registerInput.getEmail())) {
            throw new IllegalArgumentException(ErrorMessageConstants.EXISTED_REGISTRATION_EMAIL);
        }

        if (userRepository.existsByUsername(registerInput.getUsername())) {
            throw new IllegalArgumentException(ErrorMessageConstants.EXISTED_REGISTRATION_USERNAME);
        }

        if (!registerInput.getPassword().equals(registerInput.getConfirm())) {
            throw new IllegalArgumentException(ErrorMessageConstants.MISMATCH_REGISTRATION_PASSWORDS);
        }

        String hashedPassword = passwordEncoder.encode(registerInput.getPassword());
        User user = User.builder().role(RoleType.USER)
                .name(registerInput.getName())
                .phone(registerInput.getPhone())
                .email(registerInput.getEmail())
                .gender(registerInput.getGender())
                .username(registerInput.getUsername())
                .password(hashedPassword).build();

        // Save user to database
        userRepository.save(user);
    }
}
