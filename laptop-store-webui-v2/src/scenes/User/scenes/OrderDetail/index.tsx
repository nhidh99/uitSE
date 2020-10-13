/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { RootState } from "../../../../services/redux/rootReducer";
import { fireFetching, skipFetching } from "../../../../services/redux/slices/loaderStatusSlice";
import { fetchOrderById } from "../../../../services/redux/slices/orderSlice";
import OrderItem from "./components/OrderItem";
import OrderTrack from "./components/OrderTrack";
import ProgressBar from "./components/ProgressBar";
import { SC } from "./styles";

const OrderDetail = () => {
    // @ts-ignore
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const loading = useSelector((state: RootState) => state.loaderStatus.isLoading);
    const order = useSelector((state: RootState) => state.order);

    useEffect(() => {
        const loadData = async () => {
            dispatch(fireFetching());
            await dispatch(fetchOrderById(parseInt(orderId)));
            dispatch(skipFetching());
        };
        loadData();
    }, []);

    return loading || !order ? null : (
        <SC.Container>
            <ProgressBar />
            <SC.OrderInfo>
                <SC.Header>THÔNG TIN ĐƠN HÀNG</SC.Header>
                <div>
                    <b>Mã đơn hàng: </b>#{orderId}
                </div>
                <div>
                    <b>Ngày đặt hàng: </b>
                    {order.order_date}
                </div>
                <div>
                    <b>Dự kiến giao: </b>
                    {order.delivery_date}
                </div>
                <div>
                    <b>Tổng thanh toán: </b>
                    {order.total_price.toLocaleString()}
                    <u>đ</u>
                </div>
            </SC.OrderInfo>

            <SC.DeliveryInfo>
                <SC.Header>
                    THÔNG TIN VẬN CHUYỂN
                    <SC.CancelButton>Hủy đơn hàng</SC.CancelButton>
                </SC.Header>
                <div>
                    <b>Phí vận chuyển: </b>
                    {order.transport_fee.toLocaleString()}
                    <u>đ</u>
                </div>
                <div>
                    <b>Người nhận: </b>
                    {order.receiver_name}
                </div>
                <div>
                    <b>Điện thoại: </b>
                    {order.receiver_phone}
                </div>
                <div>
                    <b>Địa chỉ: </b>
                    {order.order_location}
                </div>
            </SC.DeliveryInfo>

            <SC.TrackContainer>
                <SC.Header>TRẠNG THÁI ĐƠN HÀNG</SC.Header>
                {order.tracks.map((track, index) => (
                    <OrderTrack track={track} step={order.tracks.length - index} />
                ))}
            </SC.TrackContainer>

            <SC.ItemContainer>
                {(() => {
                    const laptops = order.items.filter((i) => i.type === "LAPTOP");
                    const count = laptops.map((l) => l.quantity).reduce((a, b) => a + b, 0);
                    const price = laptops.map((l) => l.total_price).reduce((a, b) => a + b, 0);
                    return (
                        <>
                            <SC.Header>
                                DANH SÁCH SẢN PHẨM
                                <SC.PaymentSummary>
                                    {`${count} sản phẩm | ${price.toLocaleString()}`}
                                    <u>đ</u>
                                </SC.PaymentSummary>
                            </SC.Header>
                            {laptops.map((item) => (
                                <OrderItem item={item} />
                            ))}
                        </>
                    );
                })()}
            </SC.ItemContainer>

            <SC.ItemContainer>
                {(() => {
                    const promotions = order.items.filter((i) => i.type === "PROMOTION");
                    const count = promotions.map((l) => l.quantity).reduce((a, b) => a + b, 0);
                    const price = promotions.map((l) => l.total_price).reduce((a, b) => a + b, 0);
                    return (
                        <>
                            <SC.Header>
                                DANH SÁCH KHUYẾN MÃI
                                <SC.PaymentSummary>
                                    {`${count} khuyến mãi | ${price.toLocaleString()}`}
                                    <u>đ</u>
                                </SC.PaymentSummary>
                            </SC.Header>
                            {promotions.map((item) => (
                                <OrderItem item={item} />
                            ))}
                        </>
                    );
                })()}
            </SC.ItemContainer>
        </SC.Container>
    );
};

export default OrderDetail;
