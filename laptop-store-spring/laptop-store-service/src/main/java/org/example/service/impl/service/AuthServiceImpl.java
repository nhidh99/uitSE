package org.example.service.impl.service;

import org.example.dao.UserRepository;
import org.example.input.form.LoginInput;
import org.example.input.form.RegisterInput;
import org.example.model.User;
import org.example.security.JwtProvider;
import org.example.service.api.checker.AuthChecker;
import org.example.service.api.checker.UserChecker;
import org.example.service.api.creator.UserCreator;
import org.example.service.api.service.AuthService;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;

import javax.naming.AuthenticationException;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final JwtProvider jwtProvider;
    private final AuthChecker authChecker;
    private final UserChecker userChecker;
    private final UserCreator userCreator;
    private final TransactionTemplate txTemplate;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, JwtProvider jwtProvider,
                           UserChecker userChecker, AuthChecker authChecker,
                           UserCreator userCreator, PlatformTransactionManager txManager) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
        this.userChecker = userChecker;
        this.authChecker = authChecker;
        this.userCreator = userCreator;
        this.txTemplate = new TransactionTemplate(txManager);
    }

    @Override
    public Pair<String, String> createTokens(LoginInput loginInput) throws AuthenticationException {
        String username = loginInput.getUsername();
        String password = loginInput.getPassword();
        authChecker.checkUserCredential(username, password);
        return jwtProvider.buildAccessAndRefreshTokens(username);
    }

    @Override
    public void insertUser(RegisterInput registerInput) {
        txTemplate.executeWithoutResult((status) -> {
            userChecker.checkRegisterInput(registerInput);
            User user = userCreator.createUser(registerInput);
            userRepository.save(user);
        });
    }
}
