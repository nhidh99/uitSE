package org.example.security;

import io.jsonwebtoken.*;
import org.example.constant.ErrorMessageConstants;
import org.example.dao.UserRepository;
import org.example.type.RoleType;
import org.example.util.Pair;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;
import java.util.Base64;
import java.util.Collections;
import java.util.Date;

@Component
public class JwtProvider {
    @Value("${org.example.security.jwt.token.secret-key:LAPTOP_STORE}")
    private String secretKey;

    @Value("${org.example.security.jwt.token.access-token-expire-length:900000}")
    private long accessTokenExpiration;

    @Value("${org.example.security.jwt.token.refresh-token-expire-length:2592000000}")
    private long refreshTokenExpiration;

    private final AppUserDetails appUserDetails;

    private final UserRepository userRepository;

    @Autowired
    public JwtProvider(AppUserDetails appUserDetails, UserRepository userRepository) {
        this.appUserDetails = appUserDetails;
        this.userRepository = userRepository;
    }

    @PostConstruct
    protected void init() {
        secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
    }

    public String createAccessToken(String username) {
        Claims claims = Jwts.claims().setSubject(username);
        RoleType role = userRepository.findRoleByUsername(username);
        claims.put("auth", Collections.singletonList(new SimpleGrantedAuthority(role.getAuthority())));

        Date now = new Date();
        Date validity = new Date(now.getTime() + accessTokenExpiration);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public String createRefreshToken(String username) {
        Claims claims = Jwts.claims().setSubject(username);
        Date now = new Date();
        Date validity = new Date(now.getTime() + refreshTokenExpiration);

        return Jwts.builder()
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public Pair<String, String> buildAccessAndRefreshTokens(String username) {
        String accessToken = createAccessToken(username);
        String refreshToken = createRefreshToken(username);
        return Pair.of(accessToken, refreshToken);
    }

    public Authentication getAuthentication(String token) {
        UserDetails userDetails = appUserDetails.loadUserByUsername(getUsername(token));
        return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
    }

    public String getUsername(String token) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
    }

    public String resolveToken(HttpServletRequest req) {
        String bearerToken = req.getHeader(HttpHeaders.AUTHORIZATION);
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token);
            return true;
        } catch (MalformedJwtException | UnsupportedJwtException | SignatureException | IllegalArgumentException e) {
            throw new AuthenticationException(ErrorMessageConstants.FORBIDDEN) {
            };
        }
    }
}
