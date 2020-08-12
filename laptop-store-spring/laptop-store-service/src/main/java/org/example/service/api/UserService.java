package org.example.service.api;

import org.example.model.User;

public interface UserService {
    User findByUsername(String username);
}