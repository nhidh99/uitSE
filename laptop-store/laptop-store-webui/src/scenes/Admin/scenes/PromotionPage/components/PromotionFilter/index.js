import React, { useState, useEffect } from "react";
import { Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import styles from "./styles.module.scss";
import PromotionEdit from "../PromotionEdit";

const PromotionFilter = () => {
    const [filter, setFilter] = useState("");

    const getPathName = () => {
        let query = decodeURIComponent(window.location.search);
        let filter = query.split('&')[0];
        return filter.startsWith('?page') ? "" : filter.substring(3, filter.length);
    }

    useEffect(() => {
        setFilter(getPathName());
    }, []);

    const search = () => {
        const filter = document.getElementById("filter").value;
        if (filter !== "") {
            window.location.href = `/admin/promotions/search?q=${filter}`;
        } else window.location.href = "/admin/promotions";
    };

    return (
        <Row className={styles.row}>
            <Col sm="8" className={styles.searchCol}>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                            <FaSearch />
                        </InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" id="filter" placeholder="Tìm kiếm..." defaultValue={filter} />
                </InputGroup>
            </Col>

            <Col sm="2" className={styles.buttonCol}>
                <Button className={styles.button} color="info" onClick={search}>
                    <FaSearch />
                    &nbsp;&nbsp;Tìm kiếm
                </Button>
            </Col>

            <Col sm="2" className={styles.buttonCol}>
                <PromotionEdit />
            </Col>
        </Row>
    );
};

export default PromotionFilter;
