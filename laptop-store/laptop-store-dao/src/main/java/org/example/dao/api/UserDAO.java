package org.example.dao.api;

import org.example.model.User;


import java.util.Optional;

public interface UserDAO {
    boolean login(String username, String password) throws Exception;

    boolean checkRegister(String username, String email);

    boolean checkEmailExisted(String email);

    void register(User user);

    void update(User user);

    void saveCart(Integer userId, String cartJSON);

    void saveWishList(Integer userId, String wishListJSON);

    Optional<User> findByUsername(String username);

    Optional<User> findById(Integer id);

    Optional<User> findByFacebookId(String facebookId);

    Optional<User> findByGoogleId(String googleId);

    boolean updatePassword(Integer userId, String oldPassword, String newPassword);
}