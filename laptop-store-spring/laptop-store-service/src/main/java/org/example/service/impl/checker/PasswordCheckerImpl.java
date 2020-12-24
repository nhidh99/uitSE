package org.example.service.impl.checker;

import org.example.constant.ErrorMessageConstants;
import org.example.input.form.PasswordInput;
import org.example.service.api.checker.PasswordChecker;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

@Service
public class PasswordCheckerImpl implements PasswordChecker {
    @Override
    public void checkPasswordInput(PasswordInput passwordInput, String oldHashedPassword) {
        String oldPassword = passwordInput.getOldPassword();
        String newPassword = passwordInput.getNewPassword();
        String confirmPassword = passwordInput.getConfirmPassword();
        checkUserOldPassword(oldPassword, oldHashedPassword);
        checkMatchedNewPasswords(newPassword, confirmPassword);
    }

    private void checkUserOldPassword(String oldPassword, String oldHashedPassword) {
        if (!BCrypt.checkpw(oldPassword, oldHashedPassword)) {
            throw new IllegalArgumentException(ErrorMessageConstants.WRONG_OLD_PASSWORD);
        }
    }

    private void checkMatchedNewPasswords(String newPassword, String confirmPassword) {
        if (!newPassword.equals(confirmPassword)) {
            throw new IllegalArgumentException(ErrorMessageConstants.MISMATCH_NEW_PASSWORDS);
        }
    }
}
