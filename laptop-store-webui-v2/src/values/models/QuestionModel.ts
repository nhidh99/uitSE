import ReplyModel from "./ReplyModel";

type QuestionModel = {
    id: number;
    question: string;
    author_name: string;
    created_at: string;
    answer: null | ReplyModel;
    reply_count: number;
};

export default QuestionModel;
