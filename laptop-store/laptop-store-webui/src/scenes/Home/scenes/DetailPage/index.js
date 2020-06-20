/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import OverviewBlock from "./components/OverviewBlock";
import DetailBlock from "./components/DetailBlock";
import SuggestBlock from "./components/SuggestBlock";
import RatingBlock from "./components/RatingBlock";
import RatingList from "./components/RatingList";
import QuestionBlock from "./components/QuestionBlock";
import { Row, Label } from "reactstrap";
import styles from "./styles.module.scss";
import { FaCaretRight } from "react-icons/fa";
import { convertBrandType } from "../../../../services/helper/converter";
import ReactPlaceholder from "react-placeholder/lib";
import QuestionList from "./components/QuestionList";

const DetailPage = (props) => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [imageIds, setImageIds] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [comments, setComments] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        window.scroll(0, 0);
        const path = window.location.pathname;
        const productId = path.split("/").slice(-1).pop();
        if (isNaN(parseInt(productId))) {
            window.location.href = "/";
        } else {
            loadData(productId);
        }
    }, []);

    const loadData = async (productId) => {
        const [product, imageIds, ratings, promotions, suggestions] = await Promise.all([
            loadProduct(productId),
            loadImages(productId),
            loadRatings(productId),
            loadPromotions(productId),
            loadSuggestions(productId),
            loadComments(productId),
        ]);
        setProduct(product);
        setImageIds(imageIds);
        setRatings(ratings);
        setComments(comments);
        setPromotions(promotions);
        setSuggestions(suggestions);
        setLoading(false);
    };

    const loadComments = async (productId) => {
        const response = await fetch(`/cxf/api/comments?product-id=${productId}`);
        return response.ok ? await response.json() : [];
    };

    const loadProduct = async (productId) => {
        const response = await fetch(`/cxf/api/laptops/${productId}`);
        return response.ok ? await response.json() : null;
    };

    const loadImages = async (productId) => {
        const response = await fetch(`/cxf/api/laptops/${productId}/image-ids`);
        return response.ok ? await response.json() : null;
    };

    const loadRatings = async (productId) => {
        const response = await fetch(`/cxf/api/ratings?product-id=${productId}`);
        return response.ok ? await response.json() : [];
    };

    const loadPromotions = async (productId) => {
        const response = await fetch(`/cxf/api/laptops/${productId}/promotions`);
        return response.ok ? await response.json() : [];
    };

    const loadSuggestions = async (productId) => {
        const response = await fetch(`/cxf/api/laptops/${productId}/suggestions`);
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

    const ProductTitle = ({ product }) => (
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

    const DetailLoading = () =>
        [...Array(5)].map((_) => (
            <Fragment>
                <ReactPlaceholder
                    type="textRow"
                    className={styles.textHolder}
                    showLoadingAnimation
                />
                <ReactPlaceholder type="rect" className={styles.rectHolder} showLoadingAnimation />
            </Fragment>
        ));

    return loading ? (
        <DetailLoading />
    ) : (
        <Fragment>
            <ContentBlock
                title={<ProductTitle product={product} />}
                component={
                    <OverviewBlock product={product} promotions={promotions} imageIds={imageIds} />
                }
            />

            <ContentBlock
                title="Thông tin chi tiết"
                component={<DetailBlock product={product} />}
            />

            <ContentBlock
                title="Sản phẩm tương tự"
                component={<SuggestBlock suggestions={suggestions} />}
            />

            <ContentBlock
                title="Hỏi, đáp về sản phẩm"
                component={<QuestionBlock comments={comments} product={product} />}
            />

            <ContentBlock
                title="Khách hàng hỏi đáp"
                component={<QuestionList comments={comments} />}
            />

            <ContentBlock
                title="Đánh giá sản phẩm"
                component={<RatingBlock ratings={ratings} product={product} />}
            />

            {ratings.length > 0 ? (
                <ContentBlock
                    title="Khách hàng đánh giá"
                    component={<RatingList ratings={ratings} />}
                />
            ) : null}
        </Fragment>
    );
};

export default DetailPage;
