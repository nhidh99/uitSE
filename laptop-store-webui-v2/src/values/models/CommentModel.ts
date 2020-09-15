import ReplyModel from "./ReplyModel";

type CommentModel = {
    id: number;
    user: string;
    question: string;
    comment_date: string;
    replies: ReplyModel[];
};

export default CommentModel;