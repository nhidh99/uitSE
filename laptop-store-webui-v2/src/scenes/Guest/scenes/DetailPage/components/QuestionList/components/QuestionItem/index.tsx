import React from "react";
import { CommentType } from "../../../../../../../../global/types";
import { SC } from "./styles";
import QuestionReply from "../QuestionReply";

type QuestionItemProps = {
    comment: CommentType;
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
