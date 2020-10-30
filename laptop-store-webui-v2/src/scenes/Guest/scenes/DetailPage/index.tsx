/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import LoadingBlock from "./components/LoadingBlock";
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
import { useDispatch, useSelector } from "react-redux";

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
    const dispatch = useDispatch();

    const [loading, setLoading] = useState<boolean>(true);

    // @ts-ignore
    const { showComments, showRatings }: ShowState = useSelector((state: RootState) => ({
        showComments: state.product && state.product.ratings.length !== 0,
        showRatings: state.product && state.product.ratings.length !== 0,
    }));

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            window.scroll(0, 0);
            if (isNaN(parseInt(productId))) {
                history.push("/");
                return;
            }

            try {
                const id = parseInt(productId);
                await dispatch(fetchProductDetailById(id));
                setLoading(false);
            } catch (err) {
                setLoading(true);
            }
        };

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
            <ContentBlock title="Thông tin" component={OverviewBlock} show={true} />
            <ContentBlock title="Thông tin chi tiết" component={SpecBlock} show={true} />
            <ContentBlock title="Sản phẩm tương tự" component={SuggestBlock} show={true} />
            <ContentBlock title="Hỏi, đáp về sản phẩm" component={QuestionBlock} show={true} />
            <ContentBlock title="Khách hàng hỏi đáp" component={QuestionList} show={showComments} />
            <ContentBlock title="Đánh giá sản phẩm" component={RatingBlock} show={true} />
            <ContentBlock title="Khách hàng đánh giá" component={RatingList} show={showRatings} />
        </>
    );
};

export default DetailPage;
