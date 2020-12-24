package org.example.service.api.checker;

import javax.naming.AuthenticationException;

public interface AuthChecker {
    void checkUserCredential(String username, String password) throws AuthenticationException;
}
