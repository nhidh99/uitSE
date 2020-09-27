import CommentModel from "./CommentModel";
import ProductSpecModel from "./ProductSpecModel";
import ProductSummaryModel from "./ProductSummaryModel";
import PromotionModel from "./PromotionModel";
import RatingModel from "./RatingModel";

type ProductDetailModel = {
    promotions: PromotionModel[];
    suggestions: ProductSummaryModel[];
    image_ids: number[];
    comments: CommentModel[];
    ratings: RatingModel[];
    spec: ProductSpecModel;
};

export default ProductDetailModel;
