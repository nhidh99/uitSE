/* eslint-disable react-hooks/exhaustive-deps */
import React, { ChangeEvent, memo, useCallback, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { SC } from "./styles";
import queryString from "query-string";

const SortFilter = () => {
    const history = useHistory();
    const location = useLocation();
    const [value, setValue] = useState<string>("best_selling");

    const changeSort = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
        const params = queryString.parse(location.search);
        params.sort = e.target.value;
        history.push({
            pathname: window.location.pathname,
            search: queryString.stringify(params, { skipEmptyString: true }),
        });
    }, []);

    useEffect(() => {
        const params = queryString.parse(location.search);
        // @ts-ignore
        setValue(params?.sort ?? "best_selling");
    }, [location.search]);

    return (
        <SC.Select id="sort" value={value} name="sort" onChange={changeSort}>
            <option value="best_selling">Bán chạy</option>
            <option value="low_price">Giá thấp</option>
            <option value="high_price">Giá cao</option>
            <option value="latest">Máy mới</option>
        </SC.Select>
    );
};

export default memo(SortFilter);
