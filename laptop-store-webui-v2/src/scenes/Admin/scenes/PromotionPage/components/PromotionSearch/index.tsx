/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import { SSC } from "../../../../share.styles";
import queryString from "query-string";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";

type FormValue = {
    query: string;
};

const PromotionSearch = () => {
    const location = useLocation();
    const history = useHistory();

    const { register, handleSubmit } = useForm({
        defaultValues: { query: queryString.parse(location.search)?.["query"] ?? "" },
    });

    const submit = useCallback((data: FormValue) => {
        const { query } = data;
        const params = { ...queryString.parse(location.search), query: query, page: 1 };
        history.push({ pathname: location.pathname, search: queryString.stringify(params) });
    }, []);

    return (
        <SSC.SearchForm onSubmit={handleSubmit(submit)}>
            <SSC.SearchInput name="query" placeholder="Tìm kiếm theo mã hoặc tên" ref={register} />
            <SSC.SearchButton type="submit">
                <FaSearch style={{ marginBottom: "-2px", marginRight: "5px" }} />
                Tìm kiếm
            </SSC.SearchButton>
        </SSC.SearchForm>
    );
};

export default memo(PromotionSearch);
