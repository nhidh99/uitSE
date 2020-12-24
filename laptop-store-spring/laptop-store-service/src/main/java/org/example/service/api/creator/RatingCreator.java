package org.example.service.api.creator;

import org.example.input.form.RatingInput;
import org.example.model.Rating;

public interface RatingCreator {
    Rating createRating(RatingInput ratingInput);
}
