/* eslint-disable react-hooks/exhaustive-deps */
import React, {
    FocusEvent,
    memo,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import cartService from "../../../../../../../../services/helper/cartService";
import { setLoaderStatus } from "../../../../../../../../services/redux/slices/loaderStatusSlice";
import { setMessage } from "../../../../../../../../services/redux/slices/messageSlice";
import store from "../../../../../../../../services/redux/store";
import CartConstants from "../../../../../../../../values/constants/CartConstants";
import ProductOverviewModel from "../../../../../../../../values/models/ProductSummaryModel";
import { SC } from "./styles";

type QuantityInputProps = {
    item: ProductOverviewModel;
};

const QuantityInput = ({ item }: QuantityInputProps) => {
    const initialQuantity = useMemo(() => cartService.getCart()[item.id], []);
    const [quantity, setQuantity] = useState<number>(initialQuantity);

    useEffect(() => {
        const syncData = async () => {
            const cart = cartService.getCart();
            if (cart[item.id] === quantity) {
                return;
            }

            try {
                store.dispatch(setLoaderStatus(CartConstants.LOADING));
                cart[item.id] = quantity;
                await cartService.syncStorage(cart);
                store.dispatch(setLoaderStatus(CartConstants.IDLE));
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
        let message: string | null = null;
        const curCartQuantity = cartService.getTotalQuantity();

        if (quantity >= CartConstants.MAX_QUANTITY_PER_ITEM) {
            message = `Tối đa ${CartConstants.MAX_QUANTITY_PER_ITEM} 
            Laptop ${item.name} trong giỏ hàng`;
        } else if (curCartQuantity >= CartConstants.MAX_TOTAL_QUANTITY) {
            message = `Tổng số lượng sản phẩm trong giỏ hàng không được vượt quá 
            ${CartConstants.MAX_TOTAL_QUANTITY} sản phẩm`;
        }

        if (message) {
            store.dispatch(setMessage(message));
        } else {
            setQuantity(quantity + 1);
        }
    };

    const editQuantity = useCallback((e: FocusEvent<HTMLInputElement>) => {
        const value = parseInt(e.currentTarget.value) - quantity;
        if (value > 0) {
            const curCartQty = cartService.getTotalQuantity();
            let message = null;
            if (curCartQty + value > CartConstants.MAX_TOTAL_QUANTITY) {
                message = `Tổng số lượng sản phẩm trong giỏ hàng không được vượt quá 
                            ${CartConstants.MAX_TOTAL_QUANTITY} sản phẩm`;
            }
            if (message) {
                store.dispatch(setMessage(message));
                e.currentTarget.value = quantity.toString();
                return;
            }
        }
        setQuantity(quantity + value);
    }, []);

    return (
        <SC.Container>
            <SC.Button onClick={decreaseQuantity}>-</SC.Button>
            <SC.Input
                value={quantity}
                allowNegative={false}
                onBlur={editQuantity}
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

export default memo(QuantityInput);
