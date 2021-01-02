import React, { memo } from "react";
import ReactPaginate from "react-paginate";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

type Props = {
    initialPage: number;
    totalCount: number;
    sizePerPage: number;
    disabled?: boolean;
    onPageChange?: (selectedItem: { selected: number }) => void;
};

function Paginate(props: Props) {
    const { initialPage, totalCount, sizePerPage, disabled, onPageChange } = props;
    const history = useHistory();
    const location = useLocation();

    function defaultPageChange(e: { selected: number }) {
        window.scroll({ top: 0, behavior: "smooth" });
        const params = { ...queryString.parse(location.search), page: e.selected + 1 };
        history.push({
            pathname: location.pathname,
            search: queryString.stringify(params)
        });
    }

    return (
        <ReactPaginate
            containerClassName={`flex items-center self-end
            md:border md:shadow md:rounded gap-0.5 md:gap-0
            ${disabled ? "pointer-events-none" : ""}`}
            pageLinkClassName="hidden md:inline-block text-xs lg:text-sm px-4 py-2
            hover:bg-gray-200 focus:outline-none select-none"
            nextLinkClassName="border shadow md:shadow-none md:border-none 
            text-xs lg:text-sm block px-3 md:px-4 py-2
            hover:bg-gray-200 rounded-full md:rounded-none md:rounded-r focus:outline-none"
            previousLinkClassName="border shadow md:shadow-none md:border-none
            text-xs lg:text-sm block px-3 md:px-4 py-2 md:border-r
            hover:bg-gray-200 rounded-full md:rounded-none md:rounded-l focus:outline-none"
            breakLinkClassName="hidden md:block text-xs lg:text-sm px-4 py-2
            focus:outline-none select-none"
            nextClassName="md:border-l select-none"
            previousClassName="md:border-r select-none"
            activeLinkClassName="font-semibold bg-gray-200"
            disabledClassName="hidden"
            nextLabel={<span className="text-xs lg:text-sm font-semibold">{">"}</span>}
            previousLabel={<span className="text-xs lg:text-sm font-semibold">{"<"}</span>}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            initialPage={initialPage - 1}
            pageCount={Math.floor((totalCount + sizePerPage - 1) / sizePerPage)}
            onPageChange={onPageChange || defaultPageChange}
            disableInitialCallback={true}
        />
    );
}

export default memo(Paginate);
