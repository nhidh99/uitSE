import CommentModel from "./CommentModel";
import ProductOverviewModel from "./ProductOverviewModel";
import ProductSpecModel from "./ProductSpecModel";
import PromotionModel from "./PromotionModel";
import RatingModel from "./RatingModel";

type ProductDetailModel = {
    promotions: PromotionModel[];
    suggestions: ProductOverviewModel[];
    image_ids: number[];
    comments: CommentModel[];
    ratings: RatingModel[];
    spec: ProductSpecModel;
};

export default ProductDetailModel;
