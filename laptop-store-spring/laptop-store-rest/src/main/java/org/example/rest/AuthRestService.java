package org.example.rest;

import org.example.constant.HeaderConstants;
import org.example.constant.SuccessMessageConstants;
import org.example.input.LoginInput;
import org.example.input.RegisterInput;
import org.example.service.api.AuthService;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.naming.AuthenticationException;

@RestController
@RequestMapping("/api/auth")
@PreAuthorize("permitAll()")
public class AuthRestService {
    @Autowired
    private AuthService authService;

    @PostMapping(value = "/login",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.TEXT_PLAIN_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> login(@RequestBody LoginInput loginInput) throws AuthenticationException {
        Pair<String, String> tokens = authService.createTokens(loginInput);
        HttpHeaders headers = new HttpHeaders() {{
            add(HeaderConstants.ACCESS_TOKEN, tokens.getFirst());
            add(HeaderConstants.REFRESH_TOKEN, tokens.getSecond());
        }};
        return ResponseEntity.noContent().headers(headers).build();
    }

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> register(@RequestBody RegisterInput registerInput) {
        authService.insertUser(registerInput);
        return ResponseEntity.ok(SuccessMessageConstants.POST_REGISTRATION);
    }
}