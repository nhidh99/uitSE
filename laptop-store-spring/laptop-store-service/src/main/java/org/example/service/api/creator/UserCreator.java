package org.example.service.api.creator;

import org.example.input.form.RegisterInput;
import org.example.model.User;

public interface UserCreator {
    User createUser(RegisterInput registerInput);
}
