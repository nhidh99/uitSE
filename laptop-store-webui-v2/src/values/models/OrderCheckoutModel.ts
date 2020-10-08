import OrderItemModel from "./OrderItemModel";

type OrderCheckoutModel = {
    transport_fee: number;
    laptop_count: number;
    promotion_count: number;
    total_price: number;
    laptop_price: number;
    promotion_price: number;
    order_date: string;
    delivery_date: string;
    items: OrderItemModel[];
};

export default OrderCheckoutModel;
