/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import OverviewBlock from "./components/OverviewBlock";
import DetailBlock from "./components/DetailBlock";
import SuggestBlock from "./components/SuggestBlock";
import RatingBlock from "./components/RatingBlock";
import CommentBlock from "./components/CommentBlock";
import { Row, Label } from "reactstrap";
import styles from "./styles.module.scss";
import { FaCaretRight } from "react-icons/fa";
import { convertBrandType } from "../../../../services/helper/converter";
import { getCookie } from "../../../../services/helper/cookie";

const DetailPage = (props) => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [ratings, setRatings] = useState([]);

    useEffect(() => {
        const path = window.location.pathname;
        const productId = path.split("/").slice(-1).pop();
        if (isNaN(parseInt(productId))) {
            window.location.href = "/";
        } else {
            loadData(productId);
        }
    }, []);

    const loadData = async (productId) => {
        const [product, ratings] = await Promise.all([
            loadProduct(productId),
            loadRatings(productId),
        ]);
        setProduct(product);
        setRatings(ratings);
        setLoading(false);
    };

    const loadProduct = async (productId) => {
        const response = await fetch(`/cxf/api/laptops/${productId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });
        return response.ok ? await response.json() : null;
    };

    const loadRatings = async (productId) => {
        const response = await fetch(`/cxf/api/ratings?product-id=${productId}`, {
            method: "GET",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });
        return response.ok ? await response.json() : [];
    };

    const ContentBlock = (props) => {
        const { title, component } = props;
        return (
            <section className={styles.section}>
                <Label className={styles.title}>{title}</Label>
                <Row className={styles.info}>{component}</Row>
            </section>
        );
    };

    const ProductTitle = (props) => {
        const { product } = props;
        return (
            <Label className={styles.title}>
                <a href="/" className={styles.productRedirect}>
                    Trang chủ
                </a>
                &nbsp;
                <FaCaretRight color="#007bff" />
                &nbsp;
                <a href="/" className={styles.productRedirect}>
                    {convertBrandType(product?.["brand"])}
                </a>
                &nbsp;
                <FaCaretRight color="#007bff" />
                &nbsp;Laptop {product?.["name"]}
            </Label>
        );
    };

    return loading ? null : (
        <Fragment>
            <ContentBlock
                title={<ProductTitle product={product} />}
                component={<OverviewBlock product={product} />}
            />

            <ContentBlock
                title="Thông tin chi tiết"
                component={<DetailBlock product={product} />}
            />

            <ContentBlock title="Sản phẩm tương tự" component={<SuggestBlock />} />

            <ContentBlock
                title="Đánh giá sản phẩm"
                component={<RatingBlock ratings={ratings} product={product} />}
            />

            <ContentBlock
                title="Khách hàng nhận xét"
                component={<CommentBlock ratings={ratings} />}
            />
        </Fragment>
    );
};

export default DetailPage;
