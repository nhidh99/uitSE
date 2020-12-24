package org.example.service.impl.creator;

import org.example.input.form.RegisterInput;
import org.example.model.User;
import org.example.service.api.creator.UserCreator;
import org.example.type.RoleType;
import org.example.util.ModelMapperUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserCreatorImpl implements UserCreator {
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserCreatorImpl(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User createUser(RegisterInput registerInput) {
        String hashedPassword = passwordEncoder.encode(registerInput.getPassword());
        User user = ModelMapperUtil.map(registerInput, User.class);
        user.setPassword(hashedPassword);
        user.setRole(RoleType.USER);
        return user;
    }
}
