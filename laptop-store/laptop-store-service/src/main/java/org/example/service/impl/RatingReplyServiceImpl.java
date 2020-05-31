package org.example.service.impl;

import org.example.dao.api.RatingDAO;
import org.example.dao.api.RatingReplyDAO;
import org.example.dao.api.UserDAO;
import org.example.input.RatingReplyInput;
import org.example.model.Rating;
import org.example.model.RatingReply;
import org.example.model.User;
import org.example.security.Secured;
import org.example.service.api.RatingReplyService;
import org.example.type.RoleType;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.security.Principal;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Path("/replies")
public class RatingReplyServiceImpl implements RatingReplyService {

    private RatingReplyDAO ratingReplyDAO;
    private UserDAO userDAO;
    private RatingDAO ratingDAO;

    @Override
    @POST
    @Secured({RoleType.ADMIN, RoleType.USER})
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response postReply(@QueryParam("rating-id") Integer ratingId, RatingReplyInput ratingReplyInput, @Context SecurityContext securityContext) {
        try {
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            User user = userDAO.findById(userId).orElseThrow(BadRequestException::new);

            RatingReply ratingReply = buildReplyFromRequestBody(ratingId, ratingReplyInput);
            ratingReply.setUser(user);
            ratingReplyDAO.save(ratingReply);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception ex) {
            return Response.serverError().build();
        }
    }

    @Override
    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findByRatingIds(@QueryParam("rating-ids") List<Integer> ratingIds) {
        try {
            List<RatingReply> ratingReplies = ratingReplyDAO.findByRatingIds(ratingIds);
            return Response.ok(ratingReplies).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    private RatingReply buildReplyFromRequestBody(Integer ratingId, RatingReplyInput ratingReplyInput) {
        Rating rating = ratingDAO.findById(ratingId).orElseThrow(BadRequestException::new);
        LocalDate createdAt = LocalDate.now();
        return RatingReply.builder().rating(rating).reply(ratingReplyInput.getReply()).replyDate(createdAt).build();
    }
}
