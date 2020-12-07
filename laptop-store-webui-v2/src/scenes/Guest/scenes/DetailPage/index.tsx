/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router";
import LoadingBlock from "./components/LoadingBlock";
import ContentBlock from "./components/ContentBlock";
import RatingBlock from "./components/RatingBlock";
import QuestionList from "./components/QuestionList";
import OverviewBlock from "./components/OverviewBlock";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../services/redux/rootReducer";
import {
    clearProductDetail,
    fetchProductDetailById,
} from "../../../../services/redux/slices/productSlice";
import SpecBlock from "./components/SpecBlock";
import SuggestBlock from "./components/SuggestBlock";
import QuestionBlock from "./components/QuestionBlock";
import RatingList from "./components/RatingList";

const DetailPage = () => {
    // @ts-ignore
    const { productId } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();
    const product = useSelector((state: RootState) => state.product);

    useEffect(() => {
        const loadData = async () => {
            if (product?.spec.id === productId) {
                return;
            }

            if (isNaN(parseInt(productId))) {
                history.push("/");
                return;
            }

            window.scroll(0, 0);
            dispatch(clearProductDetail());
            const id = parseInt(productId);
            dispatch(fetchProductDetailById(id));
        };

        loadData();
    }, [productId]);

    return !product ? (
        <>
            {[...Array(5)].map((_) => (
                <LoadingBlock />
            ))}
        </>
    ) : (
        <>
            <ContentBlock title="Thông tin" component={<OverviewBlock />} />

            <ContentBlock title="Thông tin chi tiết" component={<SpecBlock />} />

            <ContentBlock title="Sản phẩm tương tự" component={<SuggestBlock />} />

            <ContentBlock title="Đánh giá sản phẩm" component={<RatingBlock />} />

            <ContentBlock
                title={<span id="ratings-header">Khách hàng đánh giá</span>}
                component={<RatingList />}
            />

            <ContentBlock title="Hỏi, đáp về sản phẩm" component={<QuestionBlock />} />

            {product.show_questions ? (
                <ContentBlock
                    title={<span id="questions-header">Khách hàng hỏi đáp</span>}
                    component={<QuestionList />}
                />
            ) : null}
        </>
    );
};

export default DetailPage;
