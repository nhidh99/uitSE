package org.example.service.api;

import org.example.input.RatingInput;
import org.example.input.ReplyInput;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

public interface RatingService {
    Response createRating(Integer productId, RatingInput rating, SecurityContext securityContext);

    Response findRatingsByProductId(Integer productId);

    Response deleteRatingById(Integer ratingId);

    Response approveRatingById(Integer ratingId);

    Response findRatingsByFilter(String id, String status, Integer page);

    Response createReply(Integer ratingId, ReplyInput replyInput, SecurityContext securityContext);
}