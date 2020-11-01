import React, { memo } from "react";
import { FaSearch } from "react-icons/fa";
import { SSC } from "../../../../share.styles";
import { SC } from "./styles";

const OrderSearch = () => {
    return (
        <SC.Form>
            <SSC.SearchInput name="query" placeholder="Tìm kiếm theo mã hoặc tên" />
            <SSC.SearchButton type="submit">
                <FaSearch style={{ marginBottom: "-2px", marginRight: "5px" }} />
                Tìm kiếm
            </SSC.SearchButton>
        </SC.Form>
    );
};

export default memo(OrderSearch);
