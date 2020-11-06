import ProductOverviewModel from "./ProductOverviewModel";
import ProductSpecModel from "./ProductSpecModel";
import PromotionModel from "./PromotionModel";

type ProductDetailModel = {
    promotions: PromotionModel[];
    suggestions: ProductOverviewModel[];
    image_ids: number[];
    spec: ProductSpecModel;
};

export default ProductDetailModel;
