/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback, useEffect, useState } from "react";
import { FaHeart, FaStar, FaTrash } from "react-icons/fa";
import QuantityInput from "../../../../../../../../components/QuantityInput";
import cartService from "../../../../../../../../services/helper/cartService";
import CartConstants from "../../../../../../../../values/constants/CartConstants";
import ProductOverviewModel from "../../../../../../../../values/models/ProductSummaryModel";
import { SC } from "./styles";

type CartItemProps = {
    item: ProductOverviewModel;
};

const CartItem = ({ item }: CartItemProps) => {
    const initialQuantity = cartService.getCart()[item.id];
    const [quantity, setQuantity] = useState<number>(initialQuantity);

    useEffect(() => {
        const syncData = async () => {
            const cart = cartService.getCart();
            if (cart[item.id] === quantity) {
                return;
            }

            try {
                cart[item.id] = quantity;
                await cartService.syncStorage(cart);
            } catch (err) {
                alert("Loi");
            }
        };

        syncData();
    }, [quantity]);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        if (quantity < CartConstants.MAX_QUANTITY_PER_ITEM) {
            setQuantity(quantity + 1);
        }
    };

    const removeItem = useCallback(async () => {
        await cartService.removeItem(item.id);
    }, []);

    return (
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

                <SC.Button onClick={removeItem}>
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
                    value={quantity}
                    maxValue={CartConstants.MAX_QUANTITY_PER_ITEM}
                    minValue={1}
                    onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                    onEdit={() => {}}
                />
            </SC.InputContainer>
        </SC.Container>
    );
};

export default memo(CartItem);
