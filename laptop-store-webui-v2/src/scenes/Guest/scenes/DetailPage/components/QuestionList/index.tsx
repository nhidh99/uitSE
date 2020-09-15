import React from "react";
import { SC } from "./styles";
import { RootState } from "../../../../../../services/redux/rootReducer";
import QuestionItem from "./components/QuestionItem";
import { useSelector } from "react-redux";

const QuestionList = () => {
    const comments = useSelector(
        // @ts-ignore
        (state: RootState) => state.productInfo.comments
    );

    return (
        <SC.Container>
            {comments.map((comment) => (
                <QuestionItem comment={comment} key={comment.id} />
            ))}
        </SC.Container>
    );
};

export default QuestionList;