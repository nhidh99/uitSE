package org.example.service.api;

import org.example.projection.OrderOverview;

import java.util.List;

public interface OrderService {
    List<OrderOverview> findOverviewsByUsernameAndPage(String username, int page);
    Long countByUsername(String username);
}
