package org.example.service.impl;

import org.example.dao.UserRepository;
import org.example.input.LoginInput;
import org.example.model.User;
import org.example.security.JwtProvider;
import org.example.service.api.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Component;

import javax.naming.AuthenticationException;
import java.util.Collections;

@Component
public class AuthServiceImpl implements AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtProvider jwtProvider;

    @Override
    public String issueToken(LoginInput loginInput) throws AuthenticationException {
        String username = loginInput.getUsername();
        User user = userRepository.findByUsername(username);
        boolean isValidCredential = BCrypt.checkpw(loginInput.getPassword(), user.getPassword());
        if (isValidCredential) {
            return jwtProvider.createToken(username, Collections.singletonList(user.getRole()));
        } else {
            throw new AuthenticationException("Invalid Credential");
        }
    }
}
