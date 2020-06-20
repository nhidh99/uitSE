import React, { Component } from "react";
import {
    Row,
    Col,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    Button,
} from "reactstrap";
import { FaSearch } from "react-icons/fa";
import styles from "./styles.module.scss";

class CommentFilter extends Component {
    search = () => {
        const status = document.getElementById("statusSelect").value;
        const filter = document.getElementById("filter").value;
        if (filter === "" && status === "") {
            window.location.href = "/admin/comments";
        } else window.location.href = `/admin/comments/search?id=${filter}&status=${status}`
    }
    render() {
        return (
            <Row className={styles.row}>
                <Col sm="8" className={styles.searchCol}>
                    <InputGroup>
                        <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                                <FaSearch />
                            </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" id="filter" placeholder="Tìm kiếm theo mã..." />
                    </InputGroup>
                </Col>
                <Col sm="2" className={styles.buttonCol}>
                <Input type="select" id="statusSelect" className={styles.select}>
                        <option value = "">Tất cả</option>
                        <option value = "1">Đã duyệt</option>
                        <option value = "0">Chưa duyệt</option>
                        {/* Đã trả lời or chưa?? */}
                    </Input>
                </Col>
                <Col sm="2" className={styles.buttonCol}>
                    <Button className={styles.button} color="info" onClick={this.search}>
                        <FaSearch />
                &nbsp;&nbsp;Tìm kiếm
            </Button>
                </Col>
            </Row>
        )
    }
}

export default CommentFilter;
