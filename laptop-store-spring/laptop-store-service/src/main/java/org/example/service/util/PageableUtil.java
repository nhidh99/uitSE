package org.example.service.util;

import org.example.constant.PaginateConstants;
import org.example.input.query.SearchInput;
import org.example.type.SearchOrderType;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

public class PageableUtil {
    public static Pageable createPageableFromSearch(SearchInput search) {
        Sort sort = Sort.by(search.getTarget().toString());
        if (search.getOrder().equals(SearchOrderType.DESC)) {
            sort = sort.descending();
        }
        return PageRequest.of(search.getPage() - 1, PaginateConstants.SIZE_PER_ADMIN_PAGE, sort);
    }
}