import React from "react";
import { SC } from "./styles";
import QuestionReply from "../QuestionReply";
import QuestionModel from "../../../../../../../../values/models/QuestionModel";

type QuestionItemProps = {
    question: QuestionModel;
};

const QuestionItem = ({ question }: QuestionItemProps) => (
    <SC.Container>
        <SC.CommentDetail>{question.question}</SC.CommentDetail>
        <SC.CommentInfo>
            <SC.UserFullName>{question.author_name}</SC.UserFullName> - {question.created_at}
        </SC.CommentInfo>

        <QuestionReply commentId={question.id} />
    </SC.Container>
);

export default QuestionItem;
