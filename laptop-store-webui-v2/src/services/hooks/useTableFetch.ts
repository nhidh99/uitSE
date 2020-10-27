/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosResponse } from "axios";
import { useEffect, useMemo, useRef, useState } from "react";

type PageFetchState<T> = {
    list: T[] | null;
    count: number;
};

type FetchApiParams = {
    query?: string;
    target?: string;
    order?: string;
    page?: number;
};

function useTableFetch<T>(
    fetchApi: (params: FetchApiParams) => Promise<AxiosResponse<T[]>>,
    initialParams: FetchApiParams
) {
    const initialState = useMemo<PageFetchState<T>>(
        () => ({
            list: null,
            count: 0,
        }),
        []
    );

    const [data, setData] = useState<PageFetchState<T>>(initialState);
    const [params, setParams] = useState<FetchApiParams>(initialParams);
    const { list, count } = data;

    const prevTarget = useRef<string>(params?.target ?? "");

    const setPage = (page: number) => setParams((prev) => ({ ...prev, page: page }));
    const setQuery = (query: string) => setParams((prev) => ({ ...prev, query: query }));

    const setTarget = (target: string) => {
        if (target === prevTarget.current) {
            setParams((prev) => ({ ...prev, order: params.order === "desc" ? "asc" : "desc" }));
        } else {
            prevTarget.current = target;
            setParams((prev) => ({ ...prev, target: target, order: "asc" }));
        }
    };

    useEffect(() => {
        const loadData = async () => {
            console.log(params);
            const response = await fetchApi(params);
            setData({
                list: response.data,
                count: parseInt(response.headers["x-total-count"]),
            });
        };
        loadData();
    }, [params]);

    return { list, count, setPage, setTarget, setQuery };
}

export default useTableFetch;
