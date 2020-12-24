package org.example.service.impl.checker;

import org.example.constant.ErrorMessageConstants;
import org.example.dao.UserRepository;
import org.example.model.User;
import org.example.service.api.checker.AuthChecker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import javax.naming.AuthenticationException;

@Service
public class AuthCheckerImpl implements AuthChecker {
    private final UserRepository userRepository;

    @Autowired
    public AuthCheckerImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void checkUserCredential(String username, String password) throws AuthenticationException {
        User user = userRepository.findByUsername(username);
        boolean isValidCredential = user != null && BCrypt.checkpw(password, user.getPassword());
        if (!isValidCredential) {
            throw new AuthenticationException(ErrorMessageConstants.INVALID_CREDENTIAL);
        }
    }
}
