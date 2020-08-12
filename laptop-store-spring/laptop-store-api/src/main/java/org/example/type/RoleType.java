package org.example.type;

import org.springframework.security.core.GrantedAuthority;

public enum RoleType implements GrantedAuthority {
    USER,
    ADMIN;

    public String getAuthority() {
        return name();
    }
}
