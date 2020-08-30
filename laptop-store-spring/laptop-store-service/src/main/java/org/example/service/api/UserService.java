package org.example.service.api;

import com.fasterxml.jackson.core.JsonProcessingException;
import org.example.model.User;
import org.example.type.SocialMediaType;

import java.util.Map;

public interface UserService {
    User findByUsername(String username);

    Map<SocialMediaType, Boolean> findSocialMediaAuthByUsername(String username);

    void save(User user);

    Map<String, Object> findPaymentByUsername(String username) throws JsonProcessingException;
}