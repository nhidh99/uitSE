package org.example.service.impl;

import org.example.dao.api.UserDAO;
import org.example.input.SocialMediaInput;
import org.example.model.User;
import org.example.security.Secured;
import org.example.service.api.SocialMediaAuthService;
import org.example.type.RoleType;
import org.example.util.api.JwtUtils;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.security.Principal;
import java.util.Optional;

public class FacebookAuthServiceImpl implements SocialMediaAuthService {

    private UserDAO userDAO;
    private JwtUtils jwtUtils;

    @Override
    @POST
    @Path("/sync")
    @Consumes(MediaType.APPLICATION_JSON)
    @Secured({RoleType.ADMIN, RoleType.USER})
    public Response syncWithSocialMedia(SocialMediaInput facebookInput,
                                        @Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            User user = userDAO.findById(userId).orElseThrow(Exception::new);
            user.setFacebookId(facebookInput.getId());
            userDAO.update(user);
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @DELETE
    @Path("/sync")
    @Secured({RoleType.ADMIN, RoleType.USER})
    public Response cancelSyncWithSocialMedia(@Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            User user = userDAO.findById(userId).orElseThrow(Exception::new);
            user.setFacebookId(null);
            userDAO.update(user);
            return Response.noContent().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response authBySocialMedia(SocialMediaInput facebookInput) {
        try {
            String facebookId = facebookInput.getId();
            Optional<User> optUser = userDAO.findByFacebookId(facebookId);
            if (!optUser.isPresent()) {
                return Response.status(Response.Status.NOT_FOUND).build();
            }
            User user = optUser.get();
            String token = jwtUtils.issueToken(user.getId());
            return Response.ok(token).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @POST
    @Path("/")
    @Secured({RoleType.ADMIN, RoleType.USER})
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.TEXT_PLAIN)
    public Response checkSocialMediaAuth(SocialMediaInput facebookInput) {
        try {
            String facebookId = facebookInput.getId();
            Optional<User> optUser = userDAO.findByFacebookId(facebookId);
            boolean result = optUser.isPresent();
            return Response.ok(result).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}