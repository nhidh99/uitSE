package org.example.service.api;

import org.example.input.RatingInput;
import org.example.input.RatingReplyInput;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.List;

public interface RatingService {
    Response createRating(Integer productId, RatingInput rating, SecurityContext securityContext);

    Response findRatingsByProductId(Integer productId);

    Response deleteRatingById(Integer ratingId);

    Response approveRatingById(Integer ratingId);

    Response findRatingsByFilter(String id, String status, Integer page);

    Response createReply(Integer ratingId, RatingReplyInput ratingReplyInput, SecurityContext securityContext);
}