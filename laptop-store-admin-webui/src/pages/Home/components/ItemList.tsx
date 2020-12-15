import Loader from "@/components/Loader";
import useListFetch from "@/services/hooks/useListFetch";
import useWindowSize from "@/services/hooks/useWindowSize";
import ListFetchParams from "@/types/params/ListFetchParams";
import { AxiosResponse } from "axios";
import React, { cloneElement, memo, ReactElement, ReactNode } from "react";
import Paginate from "./Paginate";

type Props = {
    toolbar: ReactNode;
    mobileVersion: ReactElement;
    desktopVersion: ReactElement;
    fetchAPI: (params: ListFetchParams) => Promise<AxiosResponse<object[]>>;
};

function ItemList(props: Props) {
    const { isMobile } = useWindowSize();
    const { toolbar, mobileVersion, desktopVersion, fetchAPI } = props;
    const { list, count, page, loading, firstLoad } = useListFetch(fetchAPI);

    return firstLoad ? (
        <Loader />
    ) : (
        <>
            {toolbar}
            {isMobile
                ? cloneElement(mobileVersion, { list: list })
                : cloneElement(desktopVersion, { list: list })}
            <Paginate
                initialPage={page || 1}
                sizePerPage={10}
                totalCount={count}
                disabled={loading}
            />
        </>
    );
}

export default memo(ItemList);
