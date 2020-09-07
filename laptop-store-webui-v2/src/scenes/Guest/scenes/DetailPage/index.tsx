/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useLocation, useHistory, useParams } from "react-router";
import laptopApi from "../../../../services/api/laptopApi";
import LoadingBlock from "./components/LoadingBlock";
import store from "../../../../services/redux/store";
import { setProductDetail } from "../../../../services/redux/slices/productInfoSlice";
import OverviewBlock from "./components/OverviewBlock";
import ContentBlock from "./components/ContentBlock";
import SpecBlock from "./components/SpecBlock";
import SuggestBlock from "./components/SuggestBlock";
import QuestionBlock from "./components/QuestionBlock";
import QuestionList from "./components/QuestionList";
import RatingBlock from "./components/RatingBlock";
import RatingList from "./components/RatingList";

type LocationState = {
    loading: boolean;
};

const DetailPage = () => {
    const location = useLocation<LocationState>();
    const history = useHistory();
    const { productId } = useParams();

    const INITIAL_STATE = {
        commentCount: 0,
        ratingCount: 0,
        loading:
            location.state?.loading || store.getState()["productInfo"] === null,
    };

    const [state, setState] = useState(INITIAL_STATE);
    const { commentCount, ratingCount, loading } = state;

    useEffect(() => {
        const loadData = async () => {
            try {
                const includes = {
                    images: true,
                    ratings: true,
                    comments: true,
                    promotions: true,
                    suggestions: true,
                };
                const response = await laptopApi.getById(productId, includes);
                const data = response.data;
                store.dispatch(setProductDetail(data));
                setState({
                    commentCount: data.comments.length,
                    ratingCount: data.ratings.length,
                    loading: false,
                });
            } catch (err) {
                setState((prev) => ({ ...prev, loading: true }));
            }
        };

        window.scroll(0, 0);
        window.history.replaceState(null, "");
        if (isNaN(parseInt(productId))) {
            history.push("/");
            return;
        }
        loadData();
    }, [productId]);

    return loading ? (
        <>
            {[...Array(5)].map((_) => (
                <LoadingBlock />
            ))}
        </>
    ) : (
        <>
            <ContentBlock
                title="Thong tin"
                component={OverviewBlock}
                show={true}
            />
            <ContentBlock
                title="Thông tin chi tiết"
                component={SpecBlock}
                show={true}
            />
            <ContentBlock
                title="Sản phẩm tương tự"
                component={SuggestBlock}
                show={true}
            />
            <ContentBlock
                title="Hỏi, đáp về sản phẩm"
                component={QuestionBlock}
                show={true}
            />

            <ContentBlock
                title="Khách hàng hỏi đáp"
                component={QuestionList}
                show={commentCount > 0}
            />

            <ContentBlock
                title="Đánh giá sản phẩm"
                component={RatingBlock}
                show={true}
            />

            <ContentBlock
                title="Khách hàng đánh giá"
                component={RatingList}
                show={ratingCount > 0}
            />
        </>
    );
};

export default DetailPage;
