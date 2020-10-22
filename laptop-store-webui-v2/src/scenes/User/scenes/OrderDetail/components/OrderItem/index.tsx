import React from "react";
import OrderItemModel from "../../../../../../values/models/OrderItemModel";
import { SC } from "./styles";

type OrderItemProps = {
    item: OrderItemModel;
};

const OrderItem = ({ item }: OrderItemProps) => {
    const Image = () =>
        item.type === "LAPTOP" ? (
            <SC.LaptopImage src={`/api/images/150/laptops/${item.id}/laptop.jpg`} alt={item.name} />
        ) : (
            <SC.PromotionImage
                src={`/api/images/200/promotions/${item.id}/promotion.jpg`}
                alt={item.name}
            />
        );

    return (
        <SC.Container>
            <div>
                <Image />
            </div>

            <div>
                <SC.ItemName>{item.name}</SC.ItemName>
                <div>
                    <SC.ItemPrice>
                        {item.unit_price.toLocaleString()}
                        <u>đ</u>
                    </SC.ItemPrice>{" "}
                    x {item.quantity} ={" "}
                    <SC.TotalPrice>
                        {item.total_price.toLocaleString()}
                        <u>đ</u>
                    </SC.TotalPrice>
                </div>
            </div>
        </SC.Container>
    );
};

export default OrderItem;