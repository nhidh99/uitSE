package org.example.util.api;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;

public interface JwtUtils {
    String issueToken(Integer userId);
    Jws<Claims> claimsJwsFromToken(String token) throws Exception;
}