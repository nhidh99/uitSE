package org.example.service.api.checker;

import org.example.input.form.PasswordInput;

public interface PasswordChecker {
    void checkPasswordInput(PasswordInput passwordInput, String oldHashedPassword);
}
