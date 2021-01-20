/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { useHistory, useLocation } from "react-router";
import { SSC } from "../../../../share.styles";
import { SC } from "./styles";
import queryString from "query-string";

type FormValue = {
    query: string;
};

const OrderSearch = () => {
    const location = useLocation();
    const history = useHistory();

    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        reset({ query: queryString.parse(location.search)?.query ?? "" });
    }, [location.search]);

    const submit = useCallback((data: FormValue) => {
        const { query } = data;
        const params = {
            ...queryString.parse(location.search, { parseNumbers: true }),
            query: query,
            page: 1,
        };
        history.push({
            pathname: location.pathname,
            search: queryString.stringify(params, { skipEmptyString: true }),
        });
    }, []);

    return (
        <SC.Form onSubmit={handleSubmit(submit)}>
            <SSC.SearchInput ref={register} name="query" placeholder="Tìm kiếm theo mã hoặc tên" />
            <SSC.SearchButton type="submit">
                <FaSearch style={{ marginBottom: "-2px", marginRight: "5px" }} />
                Tìm kiếm
            </SSC.SearchButton>
        </SC.Form>
    );
};

export default memo(OrderSearch);
