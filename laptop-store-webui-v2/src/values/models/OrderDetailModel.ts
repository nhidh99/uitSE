import OrderItemModel from "./OrderItemModel";
import OrderTrackModel from "./OrderTrackModel";

type OrderDetailModel = {
    transport_fee: number;
    total_price: number;
    receiver_name: string;
    receiver_phone: string;
    order_date: string;
    delivery_date: string;
    order_location: string;
    progress_step: number;
    items: OrderItemModel[];
    tracks: OrderTrackModel[];
};

export default OrderDetailModel;
