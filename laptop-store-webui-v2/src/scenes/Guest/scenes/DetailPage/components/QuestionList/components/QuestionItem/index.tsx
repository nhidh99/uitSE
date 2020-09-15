import React from "react";
import { SC } from "./styles";
import QuestionReply from "../QuestionReply";
import CommentModel from "../../../../../../../../values/models/CommentModel";

type QuestionItemProps = {
    comment: CommentModel;
};

const QuestionItem = ({ comment }: QuestionItemProps) => (
    <SC.Container>
        <SC.CommentDetail>{comment.question}</SC.CommentDetail>
        <SC.CommentInfo>
            <SC.UserFullName>{comment.user}</SC.UserFullName> đã gửi vào{" "}
            {comment.comment_date}
        </SC.CommentInfo>

        <QuestionReply commentId={comment.id} />
    </SC.Container>
);

export default QuestionItem;
