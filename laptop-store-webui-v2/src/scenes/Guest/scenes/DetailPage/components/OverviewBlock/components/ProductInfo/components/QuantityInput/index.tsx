/* eslint-disable react-hooks/exhaustive-deps */
import React, { FocusEvent, useState } from "react";
import { setMessage } from "../../../../../../../../../../services/redux/slices/messageSlice";
import store from "../../../../../../../../../../services/redux/store";
import CartConstants from "../../../../../../../../../../values/constants/CartConstants";
import ProductSpecModel from "../../../../../../../../../../values/models/ProductSpecModel";
import { SC } from "./styles";

type QuantityInputProps = {
    item: ProductSpecModel;
};

const QuantityInput = ({ item }: QuantityInputProps) => {
    const [quantity, setQuantity] = useState<number>(1);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const increaseQuantity = () => {
        if (quantity >= CartConstants.MAX_QUANTITY_PER_ITEM) {
            const message = `Chỉ có thể thêm tối đa ${CartConstants.MAX_QUANTITY_PER_ITEM} 
            Laptop ${item.name} vào giỏ hàng`;
            store.dispatch(setMessage(message));
        } else {
            setQuantity(quantity + 1);
        }
    };

    const updateQuantity = (e: FocusEvent<HTMLInputElement>) => {
        const value = parseInt(e.currentTarget.value);
        setQuantity(value);
    }

    return (
        <SC.Container>
            <SC.Button onClick={decreaseQuantity}>-</SC.Button>
            <SC.Input
                id="quantity"
                value={quantity}
                allowNegative={false}
                onBlur={updateQuantity}
                isAllowed={(values: any) => {
                    const { formattedValue, floatValue } = values;
                    return (
                        !formattedValue.startsWith("0") &&
                        floatValue <= CartConstants.MAX_QUANTITY_PER_ITEM
                    );
                }}
            />
            <SC.Button onClick={increaseQuantity}>+</SC.Button>
        </SC.Container>
    );
};

export default QuantityInput;
