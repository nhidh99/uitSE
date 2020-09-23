/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useLocation, useHistory, useParams } from "react-router";
import LoadingBlock from "./components/LoadingBlock";
import store from "../../../../services/redux/store";
import OverviewBlock from "./components/OverviewBlock";
import ContentBlock from "./components/ContentBlock";
import SpecBlock from "./components/SpecBlock";
import SuggestBlock from "./components/SuggestBlock";
import QuestionBlock from "./components/QuestionBlock";
import QuestionList from "./components/QuestionList";
import RatingBlock from "./components/RatingBlock";
import RatingList from "./components/RatingList";
import { fetchProductDetailById } from "../../../../services/redux/slices/productSlice";
import { RootState } from "../../../../services/redux/rootReducer";
import { useSelector } from "react-redux";

type LocationState = {
    loading: boolean;
};

type ShowState = {
    showComments: boolean;
    showRatings: boolean;
};

const DetailPage = () => {
    // @ts-ignore
    const { productId } = useParams();
    const history = useHistory();
    const location = useLocation<LocationState>();

    const [loading, setLoading] = useState<boolean>(
        location.state?.loading || store.getState().product === null
    );

    // @ts-ignore
    const { showComments, showRatings }: ShowState = useSelector(
        (state: RootState) => ({
            showComments: state.product && state.product.ratings.length !== 0,
            showRatings: state.product && state.product.ratings.length !== 0,
        })
    );

    useEffect(() => {
        const loadData = async () => {
            try {
                const id = parseInt(productId);
                await store.dispatch(fetchProductDetailById(id));
                setLoading(false);
            } catch (err) {
                setLoading(true);
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
                show={showComments}
            />

            <ContentBlock
                title="Đánh giá sản phẩm"
                component={RatingBlock}
                show={true}
            />

            <ContentBlock
                title="Khách hàng đánh giá"
                component={RatingList}
                show={showRatings}
            />
        </>
    );
};

export default DetailPage;
