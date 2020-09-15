package org.example.service.api;

import org.example.input.LoginInput;
import org.example.input.RegisterInput;

import javax.naming.AuthenticationException;

public interface AuthService {
    String issueToken(LoginInput loginInput) throws AuthenticationException;

    String issueToken(String username) throws AuthenticationException;

    void register(RegisterInput registerInput);
}
