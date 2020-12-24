package org.example.service.impl.checker;

import org.example.constant.ErrorMessageConstants;
import org.example.dao.UserRepository;
import org.example.input.form.RegisterInput;
import org.example.service.api.checker.UserChecker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserCheckerImpl implements UserChecker {
    private final UserRepository userRepository;

    @Autowired
    public UserCheckerImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void checkRegisterInput(RegisterInput registerInput) {
        String email = registerInput.getEmail();
        String username = registerInput.getUsername();
        String password = registerInput.getPassword();
        String confirm = registerInput.getConfirm();
        checkUniqueEmail(email);
        checkUniqueUsername(username);
        checkMatchedPasswords(password, confirm);
    }

    private void checkUniqueEmail(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException(ErrorMessageConstants.EXISTED_REGISTRATION_EMAIL);
        }
    }

    private void checkUniqueUsername(String username) {
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException(ErrorMessageConstants.EXISTED_REGISTRATION_USERNAME);
        }
    }

    private void checkMatchedPasswords(String password, String confirm) {
        if (!password.equals(confirm)) {
            throw new IllegalArgumentException(ErrorMessageConstants.MISMATCH_REGISTRATION_PASSWORDS);
        }
    }
}
