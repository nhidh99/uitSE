import React from "react";
import { InputGroup, InputGroupAddon, InputGroupText, Input } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import styles from "./styles.module.scss";
import { withRouter } from "react-router-dom";

const BannerSearch = (props) => {
    const searchProductsByName = (e) => {
        if (e.keyCode === 13) {
            const name = e.target.value;
            const params = new URLSearchParams();
            params.append("name", name);
            const url = `/search?${params.toString()}`;
            props.history.push(url);
        }
    };

    return (
        <div className={styles.bar}>
            <InputGroup>
                <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                        <FaSearch />
                    </InputGroupText>
                </InputGroupAddon>

                <Input
                    className={styles.input}
                    id="btn-search"
                    type="text"
                    placeholder="Tìm kiếm..."
                    onKeyUp={searchProductsByName}
                />
            </InputGroup>
        </div>
    );
};

export default withRouter(BannerSearch);
