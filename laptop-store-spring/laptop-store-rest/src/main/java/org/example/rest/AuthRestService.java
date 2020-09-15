package org.example.rest;

import org.example.constant.ErrorMessageConstants;
import org.example.constant.SuccessMessageConstants;
import org.example.input.LoginInput;
import org.example.input.RegisterInput;
import org.example.service.api.AuthService;
import org.example.service.api.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
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
    public ResponseEntity<?> login(@RequestBody LoginInput loginInput) {
        try {
            String accessToken = authService.issueToken(loginInput);
            return ResponseEntity.ok(accessToken);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ErrorMessageConstants.INVALID_CREDENTIAL);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ErrorMessageConstants.SERVER_ERROR);
        }
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

    @GetMapping(value = "/token", produces = MediaType.TEXT_PLAIN_VALUE)
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<?> issueNewToken(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            String accessToken = authService.issueToken(userDetails.getUsername());
            return ResponseEntity.ok(accessToken);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid JWT");
        }
    }
}
