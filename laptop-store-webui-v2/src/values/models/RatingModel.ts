import ReplyModel from "./ReplyModel";

type RatingModel = {
    id: number;
    user: string;
    rating: number;
    comment_title: string | null;
    comment_detail: string | null;
    rating_date: Date;
    replies: ReplyModel[];
};

export default RatingModel;