/* eslint-disable react-hooks/exhaustive-deps */
import { AxiosResponse } from "axios";
import { useEffect, useMemo, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router";
import queryString from "query-string";
import ListFetchParams from "@/types/params/ListFetchParams";

type State<T> = {
    list: T[];
    count: number;
    loading: boolean;
    firstLoad: boolean;
};

function useListFetch<T>(fetchAPI: (params: ListFetchParams) => Promise<AxiosResponse<T[]>>) {
    const location = useLocation();
    const history = useHistory();

    const initialState = useMemo<State<T>>(
        () => ({
            list: [],
            count: 0,
            loading: true,
            firstLoad: true
        }),
        []
    );

    const initialParams = queryString.parse(location.search, { parseNumbers: true });
    const [params, setParams] = useState<ListFetchParams>(initialParams);
    const [state, setState] = useState<State<T>>(initialState);

    const { list, count, loading, firstLoad } = state;
    const { query, order, page, target } = params;
    const prevTarget = useRef<string>(target || "id");

    const setTarget = (target: string) => {
        let params: ListFetchParams;
        if (target === prevTarget.current) {
            params = {
                ...queryString.parse(location.search),
                order: order === "desc" || !order ? "asc" : "desc",
            };
        } else {
            prevTarget.current = target;
            params = {
                ...queryString.parse(location.search),
                target: target,
                order: "asc",
            };
        }

        history.push({
            pathname: location.pathname,
            search: queryString.stringify(params),
        });
    };

    useEffect(() => {
        const loadData = async () => {
            setState({ ...state, loading: true })
            const response = await fetchAPI(params);
            setState({
                list: response.data,
                count: parseInt(response.headers["x-total-count"]),
                loading: false,
                firstLoad: false
            });
        };

        loadData();
    }, [params]);

    useEffect(() => {
        if (!firstLoad) {
            setParams(queryString.parse(location.search, { parseNumbers: true }));
        }
    }, [location.search]);

    return { list, count, page, query, loading, firstLoad, setTarget };
}

export default useListFetch;