type ProductSummaryModel = {
    name: string;
    id: number;
    unit_price: number;
    alt: string;
    discount_price: number;
    avg_rating: number;
    ram: {
        size: number;
    };
    hard_drive: {
        type: string;
        size: number;
    };
};

export default ProductSummaryModel;