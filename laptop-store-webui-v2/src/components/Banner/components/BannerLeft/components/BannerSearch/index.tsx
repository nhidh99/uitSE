import React from "react";
import { withRouter, useHistory } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { SC } from "./styles";

const BannerSearch = () => {
    const history = useHistory();

    const search = (e: React.KeyboardEvent<HTMLInputElement>) => {
        // When user hit enter => search products by name
        if (e.keyCode === 13) {
            const name = e.currentTarget.value;
            const params = new URLSearchParams();
            params.append("name", name);
            const url = `/search?${params.toString()}`;
            history.push(url);
        }
    };

    return (
        <SC.Container>
            <SC.Input placeholder="Tìm kiếm..." onKeyUp={search} />
            <SC.IconContainer>
                <FaSearch size={20} />
            </SC.IconContainer>
        </SC.Container>
    );
};

export default withRouter(BannerSearch);
