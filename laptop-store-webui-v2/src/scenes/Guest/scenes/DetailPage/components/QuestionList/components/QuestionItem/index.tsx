/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from "react";
import { SC } from "./styles";
import QuestionReply from "../QuestionReply";
import QuestionModel from "../../../../../../../../values/models/QuestionModel";
import ReplyItem from "../../../ReplyItem";
import questionApi from "../../../../../../../../services/api/questionApi";

type QuestionItemProps = {
    question: QuestionModel;
};

const QuestionItem = ({ question }: QuestionItemProps) => {
    const [replies, setReplies] = useState([]);

    const loadMoreReplies = useCallback(async () => {
        const response = await questionApi.getReplies(question.id);
        setReplies(response.data);
    }, []);

    return (
        <SC.Container>
            <SC.CommentDetail>{question.question}</SC.CommentDetail>
            <SC.CommentInfo>
                <SC.UserFullName>{question.author_name}</SC.UserFullName> - {question.created_at}
            </SC.CommentInfo>

            {question.answer ? (
                <SC.ReplyContainer>
                    <ReplyItem reply={question.answer} />
                    {replies.map((reply) => (
                        <ReplyItem reply={reply} />
                    ))}
                </SC.ReplyContainer>
            ) : null}

            <QuestionReply commentId={question.id} />
            {question.reply_count === 1 ? null : (
                <span onClick={loadMoreReplies}>Xem thêm {question.reply_count - 1} bình luận</span>
            )}
        </SC.Container>
    );
};

export default QuestionItem;
