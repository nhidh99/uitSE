package org.example.service.api;

import org.example.input.form.LoginInput;
import org.example.input.form.RegisterInput;
import org.example.util.Pair;

import javax.naming.AuthenticationException;

public interface AuthService {
    Pair<String, String> createTokens(LoginInput loginInput) throws AuthenticationException;

    void insertUser(RegisterInput registerInput);
}
