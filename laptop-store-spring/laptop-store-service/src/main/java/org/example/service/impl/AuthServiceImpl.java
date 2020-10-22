package org.example.service.impl;

import org.example.constant.ErrorMessageConstants;
import org.example.dao.UserRepository;
import org.example.input.LoginInput;
import org.example.input.RegisterInput;
import org.example.model.User;
import org.example.security.JwtProvider;
import org.example.service.api.AuthService;
import org.example.type.RoleType;
import org.example.util.ModelMapperUtil;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, JwtProvider jwtProvider, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public Pair<String, String> issueTokens(LoginInput loginInput) throws AuthenticationException {
        String username = loginInput.getUsername();
        User user = userRepository.findByUsername(username);

        boolean isValidCredential = user != null && BCrypt.checkpw(loginInput.getPassword(), user.getPassword());
        if (isValidCredential) {
            return jwtProvider.createAccessAndRefreshTokens(username);
        } else {
            throw new AuthenticationException(ErrorMessageConstants.INVALID_CREDENTIAL);
        }
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

        // Build user from input w/ hashed password & role
        String hashedPassword = passwordEncoder.encode(registerInput.getPassword());
        User user = ModelMapperUtil.map(registerInput, User.class);
        user.setPassword(hashedPassword);
        user.setRole(RoleType.USER);
        userRepository.save(user);
    }
}
