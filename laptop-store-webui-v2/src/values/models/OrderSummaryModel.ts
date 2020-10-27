type OrderSummaryModel = {
    id: number;
    receiver_name: string;
    receiver_phone: string;
    order_status: string;
    order_date: string;
    total_price: number;
    order_location: string;
};

export default OrderSummaryModel;
