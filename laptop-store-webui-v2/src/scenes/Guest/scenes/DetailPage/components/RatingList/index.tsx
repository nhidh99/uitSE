/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { SC } from "./styles";
import RatingModel from "../../../../../../values/models/RatingModel";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import ratingApi from "../../../../../../services/api/ratingApi";
import { hideRatingList } from "../../../../../../services/redux/slices/productSlice";
import RatingItem from "./components/RatingItem";
import Paginate from "../../../../../../components/Paginate";
import EmptyBlock from "../../../../../../components/EmptyBlock";
import { FaTruckLoading } from "react-icons/fa";

type RatingListState = {
    loading: boolean;
    ratings: RatingModel[];
    count: number;
    page: number;
};

const RatingList = () => {
    // @ts-ignore
    const { productId } = useParams();
    const dispatch = useDispatch();

    const initialState = useMemo<RatingListState>(
        () => ({
            loading: true,
            ratings: [],
            count: 0,
            page: 1,
        }),
        []
    );

    const [state, setState] = useState<RatingListState>(initialState);
    const { ratings, count, page, loading } = state;

    useEffect(() => {
        const loadData = async () => {
            setState((prev) => ({ ...prev, loading: true }));
            const response = await ratingApi.getByProductId(productId, page);
            const count = parseInt(response.headers["x-total-count"]);

            if (count === 0) {
                dispatch(hideRatingList());
            } else {
                setState((prev) => ({
                    ...prev,
                    ratings: response.data,
                    count: parseInt(response.headers["x-total-count"]),
                    loading: false,
                }));
            }
        };
        loadData();
    }, [page]);

    const pageChange = (e: { selected: number }) => {
        setState((prev) => ({ ...prev, page: e.selected + 1 }));
    };

    return count === 0 ? (
        <EmptyBlock icon={<FaTruckLoading />} title="Đang tải câu hỏi" />
    ) : (
        <>
            <SC.Container className={loading ? "loading" : undefined}>
                {ratings.map((rating) => (
                    <RatingItem rating={rating} key={rating.id} />
                ))}
            </SC.Container>
            <Paginate initialPage={1} sizePerPage={5} count={count} pageChange={pageChange} />
        </>
    );
};

export default RatingList;
