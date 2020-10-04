package org.example.service.api;

import org.example.input.LoginInput;
import org.example.input.RegisterInput;
import org.example.util.Pair;

import javax.naming.AuthenticationException;

public interface AuthService {
    Pair<String, String> issueTokens(LoginInput loginInput) throws AuthenticationException;

    void register(RegisterInput registerInput);
}
