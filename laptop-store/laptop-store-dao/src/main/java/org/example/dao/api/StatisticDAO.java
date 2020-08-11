package org.example.dao.api;

public interface StatisticDAO {
    Long countTotalDeliveredOrdersByUserId(Integer userId);

    Long countTotalAcceptedQuestionsByUserId(Integer userId);

    Long countTotalAcceptedRatingsByUserId(Integer userId);

    Long getTotalPriceOfDeliveredOrdersByUserId(Integer userId);

    Long getTotalDiscountOfDeliveredOrdersByUserId(Integer userId);
}
