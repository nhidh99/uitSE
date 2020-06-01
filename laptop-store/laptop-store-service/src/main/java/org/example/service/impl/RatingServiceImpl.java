package org.example.service.impl;

import org.example.dao.api.LaptopDAO;
import org.example.dao.api.RatingDAO;
import org.example.dao.api.RatingReplyDAO;
import org.example.dao.api.UserDAO;
import org.example.input.RatingInput;
import org.example.input.RatingReplyInput;
import org.example.model.Laptop;
import org.example.model.Rating;
import org.example.model.RatingReply;
import org.example.model.User;
import org.example.security.Secured;
import org.example.service.api.RatingService;
import org.example.type.RoleType;

import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.security.Principal;
import java.time.ZoneId;
import java.util.Date;
import java.time.LocalDate;
import java.util.List;

public class RatingServiceImpl implements RatingService {

    private RatingDAO ratingDAO;
    private UserDAO userDAO;
    private LaptopDAO laptopDAO;
    private RatingReplyDAO ratingReplyDAO;

    @Override
    @POST
    @Path("/")
    @Secured({RoleType.ADMIN, RoleType.USER})
    public Response createRating(@QueryParam("product-id") Integer productId,
                                 RatingInput ratingInput,
                                 @Context SecurityContext securityContext) {
        try {
            Rating rating = buildRatingFromRequestBody(productId, ratingInput);
            Principal principal = securityContext.getUserPrincipal();
            Integer userId = Integer.parseInt(principal.getName());
            User user = userDAO.findById(userId).orElseThrow(BadRequestException::new);
            rating.setUser(user);
            ratingDAO.save(rating);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception ex) {
            return Response.serverError().build();
        }
    }

    private Rating buildRatingFromRequestBody(Integer productId, RatingInput ratingInput) {
        Laptop laptop = laptopDAO.findById(productId).orElseThrow(BadRequestException::new);
        Date input = new Date();
        LocalDate createdAt = input.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
        return Rating.builder().laptop(laptop)
                .rating(ratingInput.getRating())
                .commentTitle(ratingInput.getCommentTitle())
                .commentDetail(ratingInput.getCommentDetail())
                .ratingDate(createdAt).build();
    }

    @Override
    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findRatingsByProductId(@QueryParam("product-id") Integer productId) {
        try {
            List<Rating> ratings = ratingDAO.findByProductId(productId);
            return Response.ok(ratings).build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }

    @Override
    @POST
    @Path("/{id}/replies")
    @Secured({RoleType.ADMIN, RoleType.USER})
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createReply(@PathParam("id") Integer ratingId,
                                RatingReplyInput ratingReplyInput,
                                @Context SecurityContext securityContext) {
        try {
            RatingReply ratingReply = buildReplyFromRequestBody(ratingId, ratingReplyInput, securityContext);
            ratingReplyDAO.save(ratingReply);
            return Response.status(Response.Status.CREATED).build();
        } catch (Exception ex) {
            return Response.serverError().build();
        }
    }

    private RatingReply buildReplyFromRequestBody(Integer ratingId,
                                                  RatingReplyInput ratingReplyInput,
                                                  SecurityContext securityContext) {
        Principal principal = securityContext.getUserPrincipal();
        Integer userId = Integer.parseInt(principal.getName());
        User user = userDAO.findById(userId).orElseThrow(BadRequestException::new);
        Rating rating = ratingDAO.findById(ratingId).orElseThrow(BadRequestException::new);
        String reply = ratingReplyInput.getReply();
        return RatingReply.builder().user(user).rating(rating).reply(reply).replyDate(LocalDate.now()).build();
    }
}
