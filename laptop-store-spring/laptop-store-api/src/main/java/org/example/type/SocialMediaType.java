package org.example.type;

public enum SocialMediaType {
    GOOGLE,
    FACEBOOK;

    @Override
    public String toString() {
        return super.toString().toLowerCase();
    }
}