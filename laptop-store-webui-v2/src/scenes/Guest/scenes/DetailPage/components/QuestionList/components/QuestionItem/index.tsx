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
            <SC.UserFullName>{question.user}</SC.UserFullName> đã gửi vào {question.comment_date}
        </SC.CommentInfo>

        <QuestionReply commentId={question.id} />
    </SC.Container>
);

export default QuestionItem;
