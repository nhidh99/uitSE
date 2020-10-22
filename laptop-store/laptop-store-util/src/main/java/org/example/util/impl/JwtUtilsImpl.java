package org.example.util.impl;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.example.util.api.JwtUtils;

import java.util.Date;

public class JwtUtilsImpl implements JwtUtils {

    private static final Long JWT_EXPIRATION_TIME = 900_000L;       // 15 minutes
    private static final String JWT_SECRET = "LAPTOP_STORE";

    @Override
    public String issueToken(Integer userId) {
        return Jwts.builder()
                .setSubject(userId.toString())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + JWT_EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, JWT_SECRET)
                .compact();
    }

    public Jws<Claims> claimsJwsFromToken(String token) throws Exception {
      return Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token);
    }
}