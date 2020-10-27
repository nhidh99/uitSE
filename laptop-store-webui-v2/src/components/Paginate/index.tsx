import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import { SC } from "./styles";

type PaginateProps = {
    count: number;
    initialPage: number;
    sizePerPage: number;
    pageChange: (e: { selected: number }) => void;
};

const Paginate = ({ count, initialPage, sizePerPage, pageChange }: PaginateProps) => (
    <SC.PaginateContainer>
        <ReactPaginate
            pageCount={Math.floor((count + sizePerPage - 1) / sizePerPage)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            initialPage={initialPage - 1}
            previousLabel={<FaArrowLeft />}
            nextLabel={<FaArrowRight />}
            onPageChange={pageChange}
        />
    </SC.PaginateContainer>
);

export default Paginate;
