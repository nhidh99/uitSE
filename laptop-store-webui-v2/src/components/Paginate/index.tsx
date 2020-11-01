/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { SC } from "./styles";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router";

type PaginateProps = {
    count: number;
    initialPage: number;
    sizePerPage: number;
};

const Paginate = ({ count, initialPage, sizePerPage }: PaginateProps) => {
    const history = useHistory();
    const location = useLocation();

    const pageChange = useCallback((e: { selected: number }) => {
        const params = { ...queryString.parse(location.search), page: e.selected + 1 };
        history.push({ pathname: location.pathname, search: queryString.stringify(params) });
    }, []);

    return (
        <SC.PaginateContainer>
            <ReactPaginate
                pageCount={Math.floor((count + sizePerPage - 1) / sizePerPage)}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                initialPage={initialPage - 1}
                previousLabel={<FaArrowLeft />}
                nextLabel={<FaArrowRight />}
                onPageChange={pageChange}
                disableInitialCallback={true}
                forcePage={initialPage - 1}
            />
        </SC.PaginateContainer>
    );
};

export default memo(Paginate);
