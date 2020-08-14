package org.example.rest;

import org.example.input.LoginInput;
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
    @Autowired
    private UserService userService;

    @PostMapping(value = "/login",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.TEXT_PLAIN_VALUE)
    @PreAuthorize("permitAll()")
    public ResponseEntity<?> login(@RequestBody LoginInput loginInput) {
        try {
            String accessToken = authService.issueToken(loginInput);
            return ResponseEntity.ok(accessToken);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Credential");
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
