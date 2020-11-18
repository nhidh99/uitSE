/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { SC } from "./styles";
import QuestionItem from "./components/QuestionItem";
import QuestionModel from "../../../../../../values/models/QuestionModel";
import Paginate from "../../../../../../components/Paginate";
import questionApi from "../../../../../../services/api/questionApi";
import { useDispatch } from "react-redux";
import { hideQuestionList } from "../../../../../../services/redux/slices/productSlice";
import { useParams } from "react-router";
import EmptyBlock from "../../../../../../components/EmptyBlock";
import { FaTruckLoading } from "react-icons/fa";

type QuestionListState = {
    loading: boolean;
    questions: QuestionModel[];
    count: number;
    page: number;
};

const QuestionList = () => {
    // @ts-ignore
    const { productId } = useParams();
    const dispatch = useDispatch();

    const initialState = useMemo<QuestionListState>(
        () => ({
            loading: true,
            questions: [],
            count: 0,
            page: 1,
        }),
        []
    );

    const [state, setState] = useState<QuestionListState>(initialState);
    const { questions, count, page, loading } = state;

    useEffect(() => {
        const loadData = async () => {
            setState((prev) => ({ ...prev, loading: true }));
            const response = await questionApi.getByProductId(productId, page);
            const count = parseInt(response.headers["x-total-count"]);

            if (count === 0) {
                dispatch(hideQuestionList());
            } else {
                setState((prev) => ({
                    ...prev,
                    questions: response.data,
                    count: parseInt(response.headers["x-total-count"]),
                    loading: false,
                }));
            }
        };
        loadData();
    }, [page]);

    const pageChange = (e: { selected: number }) => {
        const container = document.getElementById("questions-header");
        container?.scrollIntoView({ behavior: "smooth" });
        setState((prev) => ({ ...prev, page: e.selected + 1 }));
    };

    return count === 0 ? (
        <EmptyBlock icon={<FaTruckLoading />} title="Đang tải câu hỏi" />
    ) : (
        <>
            <SC.Container className={loading ? "loading" : undefined}>
                {questions.map((question) => (
                    <QuestionItem question={question} key={question.id} />
                ))}
            </SC.Container>
            <Paginate initialPage={1} sizePerPage={10} count={count} pageChange={pageChange} />
        </>
    );
};

export default QuestionList;
