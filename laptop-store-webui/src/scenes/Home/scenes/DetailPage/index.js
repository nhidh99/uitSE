/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import OverviewBlock from "./components/OverviewBlock";
import DetailBlock from "./components/DetailBlock";
import SuggestBlock from "./components/SuggestBlock";
import RatingBlock from "./components/RatingBlock";
import QuestionBlock from "./components/QuestionBlock";
import RatingList from "./components/RatingList";
import { Label } from "reactstrap";
import styles from "./styles.module.scss";
import ReactPlaceholder from "react-placeholder/lib";
import QuestionList from "./components/QuestionList";
import { withRouter, useParams } from "react-router-dom";
import laptopApi from "../../../../services/api/laptopApi";
import store from "../../../../services/redux/store";
import {
    setProductDetail,
    buildErrorModal,
} from "../../../../services/redux/actions";
import ProductTitle from "./components/ProductTitle";
import { useSelector } from "react-redux";

const DetailPage = (props) => {
    const [loading, setLoading] = useState(
        props.location.state?.loading ?? true
    );
    const { productId } = useParams();
    const { commentLength, ratingLength } = useSelector((state) => {
        const productDetail = state.productDetail;
        return {
            commentLength: productDetail?.comments?.length,
            ratingLength: productDetail?.ratings?.length,
        };
    });

    useEffect(() => {
        window.scroll(0, 0);
        window.history.replaceState(null, "");
        if (isNaN(parseInt(productId))) {
            props.history.push("/");
        } else {
            loadData();
        }
    }, []);

    const loadData = async () => {
        try {
            const response = await laptopApi.getById(productId, {
                images: true,
                ratings: true,
                comments: true,
                promotions: true,
                suggestions: true,
            });
            const product = response.data;
            store.dispatch(
                setProductDetail({
                    product: product["details"],
                    imageIds: product["image_ids"],
                    ratings: product["ratings"],
                    promotions: product["promotions"],
                    comments: product["comments"],
                    suggestions: product["suggestions"],
                })
            );
            setLoading(false);
        } catch (err) {
            setLoading(true);
            store.dispatch(buildErrorModal());
        }
    };

    const ContentBlock = ({ title, component }) => {
        return component ? (
            <section className={styles.section}>
                <Label className={styles.title}>{title}</Label>
                <div className={styles.info}>{component}</div>
            </section>
        ) : null;
    };

    const DetailLoading = () =>
        [...Array(5)].map((_) => (
            <Fragment>
                <ReactPlaceholder
                    type="textRow"
                    className={styles.textHolder}
                    showLoadingAnimation
                />
                <ReactPlaceholder
                    type="rect"
                    className={styles.rectHolder}
                    showLoadingAnimation
                />
            </Fragment>
        ));

    return loading ? (
        <DetailLoading />
    ) : (
        <Fragment>
            <ContentBlock
                title={<ProductTitle />}
                component={<OverviewBlock />}
            />

            <ContentBlock
                title="Thông tin chi tiết"
                component={<DetailBlock />}
            />

            <ContentBlock
                title="Sản phẩm tương tự"
                component={<SuggestBlock />}
            />

            <ContentBlock
                title="Hỏi, đáp về sản phẩm"
                component={<QuestionBlock />}
            />

            <ContentBlock
                title="Khách hàng hỏi đáp"
                component={commentLength > 0 ? <QuestionList /> : null}
            />

            <ContentBlock
                title="Đánh giá sản phẩm"
                component={<RatingBlock />}
            />

            <ContentBlock
                title="Khách hàng đánh giá"
                component={ratingLength > 0 ? <RatingList /> : null}
            />
        </Fragment>
    );
};

export default withRouter(DetailPage);
