/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";

type PageFetchState<T> = {
    list: T[] | null;
    count: number;
};

type FetchApiParams = {
    query?: string;
    target?: string;
    order?: string;
    page: number;
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

    const location = useLocation();
    const history = useHistory();

    const { list, count } = data;
    const { query, order, page } = params;

    const prevTarget = useRef<string>(params?.target ?? "id");

    const isPopState = useRef<boolean>(false);

    const setPage = useCallback(
        (page: number) => setParams((prev) => ({ ...prev, page: page })),
        []
    );

    const setQuery = useCallback(
        (query: string) => setParams((prev) => ({ ...prev, query: query })),
        []
    );

    const setTarget = (target: string) => {
        if (target === prevTarget.current) {
            setParams((prev) => ({ ...prev, order: order === "desc" ? "asc" : "desc" }));
        } else {
            prevTarget.current = target;
            setParams((prev) => ({ ...prev, target: target, order: "asc" }));
        }
    };

    useEffect(() => {
        const listenToPopstate = () => {
            isPopState.current = true;
            // @ts-ignore
            setParams(queryString.parse(location.search, { parseNumbers: true }));
        };
        window.addEventListener("popstate", listenToPopstate);
        return () => {
            window.removeEventListener("popstate", listenToPopstate);
        };
    }, []);

    useEffect(() => {
        if (isPopState.current) {
            isPopState.current = false;
        } else if (list !== null) {
            history.push({
                pathname: location.pathname,
                search: queryString.stringify(params, { skipEmptyString: true }),
            });
        }
    }, [params]);

    useEffect(() => {
        const loadData = async () => {
            const params = queryString.parse(location.search, { parseNumbers: true });
            // @ts-ignore
            const response = await fetchApi(params);
            setData({
                list: response.data,
                count: parseInt(response.headers["x-total-count"]),
            });
        };
        loadData();
    }, [location.search]);

    return { list, count, page, query, setPage, setTarget, setQuery };
}

export default useTableFetch;
