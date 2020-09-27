import React, { memo } from "react";
import { FaHeart, FaStar, FaTrash } from "react-icons/fa";
import QuantityInput from "../../../../../../../../components/QuantityInput";
import cartService from "../../../../../../../../services/helper/cartService";
import CartConstants from "../../../../../../../../values/constants/CartConstants";
import ProductOverviewModel from "../../../../../../../../values/models/ProductSummaryModel";
import { SC } from "./styles";

type CartItemProps = {
    item: ProductOverviewModel;
};

const CartItem = ({ item }: CartItemProps) => (
    <SC.Container>
        <div>
            <SC.ItemImage
                src={`/api/images/150/laptops/${item.id}/${item.alt}.jpg`}
            />
        </div>

        <SC.ItemInfo>
            <SC.ItemSpec>
                <SC.ItemRating>
                    {item["avg_rating"].toFixed(1)} <FaStar size={10} />
                </SC.ItemRating>{" "}
                - RAM {item["ram"]} - {item["hard_drive"]}
            </SC.ItemSpec>

            <SC.ItemName>{item.name}</SC.ItemName>

            <div>
                <SC.UnitPrice>
                    {item["unit_price"].toLocaleString()}
                    <sup>đ</sup>
                </SC.UnitPrice>

                <SC.OriginPrice>
                    {(
                        item["unit_price"] + item["discount_price"]
                    ).toLocaleString()}
                    <sup>đ</sup>
                </SC.OriginPrice>
            </div>

            <SC.Button>
                <FaTrash size={12} />
                Xoá
            </SC.Button>

            <SC.Button>
                <FaHeart size={12} />
                Để dành mua sau
            </SC.Button>
        </SC.ItemInfo>

        <SC.InputContainer>
            <QuantityInput
                defaultValue={cartService.getCart()[item.id]}
                maxValue={CartConstants.MAX_QUANTITY_PER_ITEM}
                minValue={1}
                onIncrease={() => {}}
                onDecrease={() => {}}
                onEdit={() => {}}
            />
        </SC.InputContainer>
    </SC.Container>
);

export default memo(CartItem);
