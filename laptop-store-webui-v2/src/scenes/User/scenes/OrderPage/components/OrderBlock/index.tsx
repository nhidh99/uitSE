import React from "react";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import OrderStatusConstants from "../../../../../../values/constants/OrderStatusConstants";
import OrderOverviewModel from "../../../../../../values/models/OrderOverviewModel";
import ActionButton from "../../../../components/ActionButton/style";
import { SC } from "./styles";

type OrderBlockProps = {
    order: OrderOverviewModel;
};

const OrderBlock = ({ order }: OrderBlockProps) => (
    <SC.Container>
        <Link to={`/user/orders/${order.id}`}>
            <ActionButton style={{ float: "right" }}>
                <FaEye className="view" />
            </ActionButton>
        </Link>

        <SC.InfoContainer>
            <SC.OrderNo>ĐƠN HÀNG #{order.id}</SC.OrderNo>
        </SC.InfoContainer>

        <SC.FlexContainer>
            <SC.InfoContainer>
                <SC.FieldInfo>Trạng thái: </SC.FieldInfo>
                {OrderStatusConstants[order.order_status]}
            </SC.InfoContainer>

            <SC.InfoContainer>
                <SC.FieldInfo>Ngày đặt: </SC.FieldInfo>
                {order.order_date}
            </SC.InfoContainer>

            <SC.InfoContainer>
                <SC.FieldInfo>Trị giá: </SC.FieldInfo>
                {order.total_price.toLocaleString()}
                <u>đ</u>
            </SC.InfoContainer>
        </SC.FlexContainer>

        <SC.InfoContainer>
            <SC.FieldInfo>Chi tiết: </SC.FieldInfo>
            {order.describe}
        </SC.InfoContainer>
    </SC.Container>
);

export default OrderBlock;
