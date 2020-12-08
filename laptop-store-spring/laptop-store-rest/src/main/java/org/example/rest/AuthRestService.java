package org.example.rest;

import org.example.constant.ErrorMessageConstants;
import org.example.constant.HeaderConstants;
import org.example.constant.SuccessMessageConstants;
import org.example.input.LoginInput;
import org.example.input.RegisterInput;
import org.example.service.api.AuthService;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

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
        Pair<String, String> tokens = authService.issueTokens(loginInput);
        HttpHeaders headers = new HttpHeaders() {{
            add(HeaderConstants.ACCESS_TOKEN, tokens.getFirst());
            add(HeaderConstants.REFRESH_TOKEN, tokens.getSecond());
        }};
        return ResponseEntity.noContent().headers(headers).build();
    }

    @PostMapping(value = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> register(@RequestBody RegisterInput registerInput) {
        try {
            authService.register(registerInput);
            return ResponseEntity.ok(SuccessMessageConstants.POST_REGISTRATION);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ErrorMessageConstants.SERVER_ERROR);
        }
    }
}