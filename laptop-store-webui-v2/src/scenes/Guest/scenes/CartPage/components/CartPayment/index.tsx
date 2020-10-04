/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../../../../../components/Loader";
import { RootState } from "../../../../../../services/redux/rootReducer";
import CartConstants from "../../../../../../values/constants/CartConstants";
import CartPaymentProps from "../../../../../../values/props/CartPaymentProps";
import { SC } from "./styles";

type Props = {
    payment: CartPaymentProps;
};

const CartPayment = ({ payment }: Props) => {
    const loading = useSelector((state: RootState) =>
        [CartConstants.LOADING, CartConstants.FETCHING].includes(
            state.loaderStatus
        )
    );

    const { totalCount, totalDiscount, totalPrice } = payment;

    return (
        <SC.OuterContainer>
            <Loader loading={loading} />

            <SC.Container>
                <SC.InfoRow>
                    <div>Tổng số lượng:</div>
                    <div>{totalCount}</div>
                </SC.InfoRow>

                <SC.InfoRow>
                    <div>Tổng giảm giá:</div>
                    <div>
                        {totalDiscount.toLocaleString()}
                        <u>đ</u>
                    </div>
                </SC.InfoRow>

                <SC.InfoRow>
                    <div>Tạm tính:</div>
                    <div>
                        <b>
                            {totalPrice.toLocaleString()}
                            <u>đ</u>
                        </b>
                    </div>
                </SC.InfoRow>

                <SC.PaymentButton>TIẾN HÀNH ĐẶT HÀNG</SC.PaymentButton>
            </SC.Container>
        </SC.OuterContainer>
    );
};

export default CartPayment;
