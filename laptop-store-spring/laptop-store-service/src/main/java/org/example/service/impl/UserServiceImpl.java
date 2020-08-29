package org.example.service.impl;

import org.example.dao.UserRepository;
import org.example.input.RegisterInput;
import org.example.model.User;
import org.example.service.api.UserService;
import org.example.type.SocialMediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public Map<SocialMediaType, Boolean> findSocialMediaAuthByUsername(String username) {
        User user = userRepository.findByUsername(username);
        return new HashMap<SocialMediaType, Boolean>() {{
            put(SocialMediaType.FACEBOOK, user.getFacebookId() != null);
            put(SocialMediaType.GOOGLE, user.getGoogleId() != null);
        }};
    }

    @Override
    public void save(User user) {
        userRepository.save(user);
    }
}