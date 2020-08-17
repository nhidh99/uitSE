package org.example.service.api;

import org.example.projection.OrderRowData;

import java.util.List;

public interface OrderService {
    List<OrderRowData> findRowDataByUsernameAndPage(String username, int page);

    Long countByUsername(String username);
}
