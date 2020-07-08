package org.example.service.api;

import org.example.input.SocialMediaInput;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

public interface SocialMediaAuthService {
    Response syncWithSocialMedia(SocialMediaInput socialMediaInput, SecurityContext securityContext);

    Response cancelSyncWithSocialMedia(SecurityContext securityContext);

    Response authBySocialMedia(SocialMediaInput socialMediaInput);

    Response checkSocialMediaAuth(SocialMediaInput socialMediaInput);
}