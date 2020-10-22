import React, { useState, useEffect } from "react";
import { Row, Col, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from "reactstrap";
import { FaSearch } from "react-icons/fa";
import styles from "./styles.module.scss";

const CommentFilter = () => {
    const [filter, setFilter] = useState("");
    const [status, setStatus] = useState("");

    const getPathName = () => {
        let query = decodeURIComponent(window.location.search);
        let filter = query.split('&')[0];
        return filter.startsWith('?page') ? "" : filter.substring(4, filter.length);
    }

    const getStatus = () => {
        let query = decodeURIComponent(window.location.search);
        let status = query.split('&')[1];
        return status ? status.startsWith('?page') ? "" : status.substring(7, status.length) : "";
    }

    useEffect(() => {
        setFilter(getPathName());
        setStatus(getStatus());
    }, []);

    const search = () => {
        const status = document.getElementById("statusSelect").value;
        const filter = document.getElementById("filter").value;
        if (filter === "" && status === "") {
            window.location.href = "/admin/comments";
        } else {
            window.location.href = `/admin/comments/search?id=${filter}&status=${status}`;
        }
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
                    <Input type="text" id="filter" placeholder="Tìm kiếm theo mã..." defaultValue={filter} />
                </InputGroup>
            </Col>
            <Col sm="2" className={styles.buttonCol}>
                <Input type="select" id="statusSelect" className={styles.select}>
                    <option value=""  selected={status ===""}>Tất cả</option>
                    <option value="1" selected={status ==="1"}>Đã duyệt</option>
                    <option value="0" selected={status ==="0"}>Chưa duyệt</option>
                </Input>
            </Col>
            <Col sm="2" className={styles.buttonCol}>
                <Button className={styles.button} color="info" onClick={search}>
                    <FaSearch />
                    &nbsp;&nbsp;Tìm kiếm
                </Button>
            </Col>
        </Row>
    );
};

export default CommentFilter;
