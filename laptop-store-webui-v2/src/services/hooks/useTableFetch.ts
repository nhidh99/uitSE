/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosResponse } from "axios";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import { useDispatch } from "react-redux";
import { fireLoading, skipLoading } from "../redux/slices/loaderStatusSlice";

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

function useTableFetch<T>(fetchApi: (params: FetchApiParams) => Promise<AxiosResponse<T[]>>) {
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();

    const initialState = useMemo<PageFetchState<T>>(
        () => ({
            list: null,
            count: 0,
        }),
        []
    );

    const initialParams = queryString.parse(location.search, { parseNumbers: true });
    // @ts-ignore
    const [params, setParams] = useState<FetchApiParams>(initialParams);
    const [data, setData] = useState<PageFetchState<T>>(initialState);

    const { list, count } = data;
    const { query, order, page } = params;

    const isPopState = useRef<boolean>(false);
    const prevTarget = useRef<string>(params?.target ?? "id");

    const setPage = useCallback(
        (page: number) => setParams((prev) => ({ ...prev, page: page })),
        []
    );

    const setQuery = useCallback(
        (query: string) => setParams((prev) => ({ ...prev, query: query, page: 1 })),
        []
    );

    const setTarget = (target: string) => {
        if (target === prevTarget.current) {
            setParams((prev) => ({ ...prev, order: order === "desc" || !order ? "asc" : "desc" }));
        } else {
            prevTarget.current = target;
            setParams((prev) => ({ ...prev, target: target, order: "asc" }));
        }
    };

    useEffect(() => {
        window.addEventListener("popstate", () => {
            isPopState.current = true;
            window.location.reload();
        });
    }, []);

    useEffect(() => {
        const loadData = () => {
            if (list !== null) {
                history.push({
                    pathname: location.pathname,
                    search: queryString.stringify(params, { skipEmptyString: true }),
                });
            }
        };

        loadData();
    }, [params]);

    useEffect(() => {
        const loadTable = async () => {
            if (isPopState.current) {
                return;
            }

            const params = queryString.parse(location.search, { parseNumbers: true });
            const response = await fetchApi(params);
            setData({
                list: response.data,
                count: parseInt(response.headers["x-total-count"]),
            });
        };

        const loadData = async () => {
            if (list === null) {
                loadTable();
            } else {
                dispatch(fireLoading());
                await loadTable();
                dispatch(skipLoading());
            }
        };

        loadData();
    }, [location.search]);

    return { list, count, page, query, setPage, setTarget, setQuery };
}

export default useTableFetch;
