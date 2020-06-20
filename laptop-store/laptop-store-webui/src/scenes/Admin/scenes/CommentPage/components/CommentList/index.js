/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import { Table, ButtonGroup, Spinner } from "reactstrap";
import styles from "./styles.module.scss";
import { getCookie } from "../../../../../../services/helper/cookie";
import Loader from "react-loader-advanced";
import Pagination from "react-js-pagination";
import { ITEM_COUNT_PER_PAGE } from "../../../../../../constants";
import { withRouter } from "react-router-dom";
import CommentDelete from "../CommentDelete";
import CommentDetail from "../CommentDetail";

const CommentList = (props) => {
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(null);
    const [count, setCount] = useState(1);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const params = new URLSearchParams(props.location.search);
        const page = parseInt(params.get("page"));
        setPage(page ? page : 1);
    }, []);

    useEffect(() => {
        if (!page) return;
        setLoading(true);
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        const status = params.get("status");
        if (id === null && status === null) {
            loadData();
        } else {
            search(id, status);
        }
    }, [page]);

    const search = async (id, status) => {
        const response = await fetch(`/cxf/api/comments/search?id=${id}&status=${status}&page=${page}`, {
            method: "GET",
            headers: { Authorization: "Bearer " + getCookie("access_token") }
        });
        if (response.ok) {
            const comments = await response.json();
            setComments(comments);
            setLoading(false);
        }
    }

    const loadData = async () => {
        const response = await fetch(`/cxf/api/comments?page=${page}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });

        if (response.ok) {
            const comments = await response.json();
            const count = parseInt(response.headers.get("X-Total-Count"));
            setComments(comments);
            setCount(count);
            setLoading(false);
        }
    };

    const pageChange = (pageNumber) => {
        if (pageNumber === page) return;
        const params = new URLSearchParams(window.location.search);
        const id = params.get("id");
        const status = params.get("status");
        if (id === null) {
            props.history.push("/admin/comments?page=" + pageNumber);
        } else {
            props.history.push("/admin/comments/search?id=" + id + "&status=" + status + "&page=" + pageNumber);
        }
        setPage(pageNumber);
    };

    const buildRowFromComment = (comment) => (
        <tr>
            <td className={styles.idCol}>{comment["id"]}</td>
            <td className={styles.nameCol}>{comment["laptop"]["name"]}</td>
            <td className={styles.detailCol}>
                {comment["question"].length > 30 ?
                    comment["question"].substring(0, 30) + '...' :
                    comment["question"]}
            </td>
            <td>{comment["approve_status"] ? 'Đã duyệt' : 'Chưa duyệt'}</td>
            <td className={styles.actionCol}>
                <ButtonGroup>
                    <ButtonGroup>
                        <CommentDelete comment={comment} />
                        <CommentDetail comment={comment} />
                    </ButtonGroup>
                </ButtonGroup>
            </td>
        </tr>
    );

    const CommentTable = () => (
        <Loader show={loading} message={<Spinner />}>
            <Table className={styles.table} bordered>
                <tbody>
                    <tr>
                        <th className={styles.idCol}>Mã câu hỏi</th>
                        <th className={styles.nameCol}>Tên sản phẩm</th>
                        <th className={styles.titleCol}>Câu hỏi</th>
                        <th className={styles.statusCol}>Tình trạng</th>
                        <th className={styles.actionCol}>Thao tác</th>
                    </tr>
                    {comments.map((comment) => buildRowFromComment(comment))}
                </tbody>
            </Table>
        </Loader>
    );

    const CommentPagination = () => (
        <div className={styles.pagination}>
            <Pagination
                activePage={page}
                itemsCountPerPage={ITEM_COUNT_PER_PAGE}
                totalItemsCount={count}
                pageRangeDisplayed={5}
                onChange={pageChange}
                itemClass="page-item"
                linkClass="page-link"
            />
        </div>
    );

    return (
        <Fragment>
            <CommentTable />
            <CommentPagination />
        </Fragment>
    );
};

export default withRouter(CommentList);
