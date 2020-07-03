/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import OverviewBlock from "./components/OverviewBlock";
import DetailBlock from "./components/DetailBlock";
import SuggestBlock from "./components/SuggestBlock";
import RatingBlock from "./components/RatingBlock";
import QuestionBlock from "./components/QuestionBlock";
import RatingList from "./components/RatingList";
import { Row, Label } from "reactstrap";
import styles from "./styles.module.scss";
import { FaCaretRight } from "react-icons/fa";
import { convertBrandType } from "../../../../services/helper/converter";
import ReactPlaceholder from "react-placeholder/lib";
import QuestionList from "./components/QuestionList";
import { Link, withRouter, useParams } from "react-router-dom";
import laptopApi from "../../../../services/api/laptopApi";

const DetailPage = (props) => {
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [imageIds, setImageIds] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [comments, setComments] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const { productId } = useParams();

    useEffect(() => {
        loadData();
    }, [props.location]);

    const loadData = () => {
        window.scroll(0, 0);
        setLoading(true);
        if (isNaN(parseInt(productId))) {
            window.location.href = "/";
        } else {
            loadProductDetail();
        }
    };

    const loadProductDetail = async () => {
        const [product, imageIds, ratings, promotions, comments, suggestions] = await Promise.all([
            loadProduct(),
            loadImages(),
            loadRatings(),
            loadPromotions(),
            loadComments(),
            loadSuggestions(),
        ]);
        setProduct(product);
        setImageIds(imageIds);
        setRatings(ratings);
        setComments(comments);
        setPromotions(promotions);
        setSuggestions(suggestions);
        setLoading(false);
    };

    const loadComments = async () => {
        const response = await fetch(`/cxf/api/comments?product-id=${productId}`);
        return response.ok ? await response.json() : [];
    };

    const loadProduct = async () => {
        try {
            const response = await laptopApi.getById(productId);
            return response.data;
        } catch (err) {
            console.log('fail');
            return null;
        }
    };

    const loadImages = async () => {
        const response = await fetch(`/cxf/api/laptops/${productId}/image-ids`);
        return response.ok ? await response.json() : null;
    };

    const loadRatings = async () => {
        const response = await fetch(`/cxf/api/ratings?product-id=${productId}`);
        return response.ok ? await response.json() : [];
    };

    const loadPromotions = async () => {
        const response = await fetch(`/cxf/api/laptops/${productId}/promotions`);
        return response.ok ? await response.json() : [];
    };

    const loadSuggestions = async () => {
        const response = await fetch(`/cxf/api/laptops/${productId}/suggestions`);
        return response.ok ? await response.json() : [];
    };

    const ContentBlock = ({ hide, title, component }) => {
        return hide ? null : (
            <section className={styles.section}>
                <Label className={styles.title}>{title}</Label>
                <Row className={styles.info}>{component}</Row>
            </section>
        );
    };

    const ProductTitle = ({ product }) => (
        <Label className={styles.title}>
            <Link to="/" className={styles.productRedirect}>
                Trang chủ
            </Link>
            &nbsp;
            <FaCaretRight color="#007bff" />
            &nbsp;
            <Link to={`/search?brands=${product["brand"]}`} className={styles.productRedirect}>
                {convertBrandType(product?.["brand"])}
            </Link>
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
                hide={comments.length === 0}
                title="Khách hàng hỏi đáp"
                component={<QuestionList comments={comments} />}
            />

            <ContentBlock
                title="Đánh giá sản phẩm"
                component={<RatingBlock ratings={ratings} product={product} />}
            />

            <ContentBlock
                hide={ratings.length === 0}
                title="Khách hàng đánh giá"
                component={<RatingList ratings={ratings} />}
            />
        </Fragment>
    );
};

export default withRouter(DetailPage);
