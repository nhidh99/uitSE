/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback } from "react";
import { SSC } from "../../../../share.styles";
import queryString from "query-string";
import { useHistory, useLocation } from "react-router";

const OrderFilter = () => {
    const location = useLocation();
    const history = useHistory();

    const select = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const params = {
            ...queryString.parse(location.search, { parseNumbers: true }),
            status: e.currentTarget.value,
            query: "",
            page: 1,
        };
        history.push({
            pathname: location.pathname,
            search: queryString.stringify(params, { skipEmptyString: true }),
        });
    }, []);

    return (
        <SSC.Select name="status" style={{ flex: "1" }} onChange={select}>
            <option value="pending">Chờ duyệt</option>
            <option value="received">Tiếp nhận</option>
            <option value="packaged">Đóng gói</option>
            <option value="delivering">Vận chuyển</option>
            <option value="delivered">Đã giao</option>
            <option value="canceled">Đã huỷ</option>
        </SSC.Select>
    );
};

export default memo(OrderFilter);
