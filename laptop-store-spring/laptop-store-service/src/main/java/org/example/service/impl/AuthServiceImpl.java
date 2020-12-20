package org.example.service.impl;

import org.example.constant.ErrorMessageConstants;
import org.example.dao.UserRepository;
import org.example.input.form.LoginInput;
import org.example.input.form.RegisterInput;
import org.example.model.User;
import org.example.security.JwtProvider;
import org.example.service.api.AuthService;
import org.example.type.RoleType;
import org.example.util.ModelMapperUtil;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import javax.naming.AuthenticationException;

@Service
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final PasswordEncoder passwordEncoder;
    private final TransactionTemplate txTemplate;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, JwtProvider jwtProvider,
                           PasswordEncoder passwordEncoder, PlatformTransactionManager txManager) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
        this.passwordEncoder = passwordEncoder;
        this.txTemplate = new TransactionTemplate(txManager);
    }

    @Override
    public Pair<String, String> createTokens(LoginInput loginInput) throws AuthenticationException {
        String username = loginInput.getUsername();
        String password = loginInput.getPassword();
        checkUserCredential(username, password);
        return jwtProvider.buildAccessAndRefreshTokens(username);
    }

    private void checkUserCredential(String username, String password) throws AuthenticationException {
        User user = userRepository.findByUsername(username);
        boolean isValidCredential = user != null && BCrypt.checkpw(password, user.getPassword());
        if (!isValidCredential) {
            throw new AuthenticationException(ErrorMessageConstants.INVALID_CREDENTIAL);
        }
    }

    @Override
    public void insertUser(RegisterInput registerInput) {
        txTemplate.executeWithoutResult((status) -> {
            checkRegistration(registerInput);
            User user = createUser(registerInput);
            userRepository.save(user);
        });
    }

    private void checkRegistration(RegisterInput registerInput) {
        String email = registerInput.getEmail();
        String username = registerInput.getUsername();
        String password = registerInput.getPassword();
        String confirm = registerInput.getConfirm();
        checkUniqueEmail(email);
        checkUniqueUsername(username);
        checkMatchedPasswords(password, confirm);
    }

    private void checkUniqueEmail(String email) {
        if (userRepository.existsByEmail(email)) {
            throw new IllegalArgumentException(ErrorMessageConstants.EXISTED_REGISTRATION_EMAIL);
        }
    }

    private void checkUniqueUsername(String username) {
        if (userRepository.existsByUsername(username)) {
            throw new IllegalArgumentException(ErrorMessageConstants.EXISTED_REGISTRATION_USERNAME);
        }
    }

    private void checkMatchedPasswords(String password, String confirm) {
        if (!password.equals(confirm)) {
            throw new IllegalArgumentException(ErrorMessageConstants.MISMATCH_REGISTRATION_PASSWORDS);
        }
    }

    private User createUser(RegisterInput registerInput) {
        String hashedPassword = passwordEncoder.encode(registerInput.getPassword());
        User user = ModelMapperUtil.map(registerInput, User.class);
        user.setPassword(hashedPassword);
        user.setRole(RoleType.USER);
        return user;
    }
}
