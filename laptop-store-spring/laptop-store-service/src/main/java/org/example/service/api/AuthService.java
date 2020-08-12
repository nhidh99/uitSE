package org.example.service.api;

import org.example.input.LoginInput;

import javax.naming.AuthenticationException;

public interface AuthService {
    String issueToken(LoginInput loginInput) throws AuthenticationException;
}
