/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosResponse } from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
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
    const [params, setParams] = useState<FetchApiParams>(initialParams);
    const [data, setData] = useState<PageFetchState<T>>(initialState);

    const { list, count } = data;
    const { query, order, page, target } = params;
    const prevTarget = useRef<string>(target || "id");

    const setTarget = (target: string) => {
        if (target === prevTarget.current) {
            const params = {
                ...queryString.parse(location.search),
                order: order === "desc" || !order ? "asc" : "desc",
            };
            history.push({
                pathname: location.pathname,
                search: queryString.stringify(params),
            });
        } else {
            prevTarget.current = target;
            const params = {
                ...queryString.parse(location.search),
                target: target,
                order: "asc",
            };
            history.push({
                pathname: location.pathname,
                search: queryString.stringify(params),
            });
        }
    };

    useEffect(() => {
        const loadTable = async () => {
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
    }, [params]);

    useEffect(() => {
        setParams(queryString.parse(location.search, { parseNumbers: true }));
    }, [location.search]);

    return { list, count, page, query, setTarget };
}

export default useTableFetch;
