/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getCookie } from "../../../../../../services/helper/cookie";
import { RootState } from "../../../../../../services/redux/rootReducer";
import CartPaymentProps from "../../../../../../values/props/CartPaymentProps";
import { SC } from "./styles";

type Props = {
    payment: CartPaymentProps;
};

const CartPayment = ({ payment }: Props) => {
    const { totalCount, totalDiscount, totalPrice } = payment;
    const loading = useSelector((state: RootState) => state.loaderStatus.isLoading);
    const history = useHistory();

    const checkout = () => {
        if (loading || totalCount === 0) {
            return;
        }
        if (getCookie("access_token") === null) {
            history.push("/auth/login");
        } else {
            history.push("/checkout");
        }
    };

    return (
        <SC.OuterContainer className={loading ? "loading" : undefined}>
            <SC.Container>
                <SC.InfoRow>
                    <div>
                        <b>Tổng số lượng:</b>
                    </div>
                    <div>{totalCount}</div>
                </SC.InfoRow>

                <SC.InfoRow>
                    <div>
                        <b>Tổng giảm giá:</b>
                    </div>
                    <div>
                        {totalDiscount.toLocaleString()}
                        <u>đ</u>
                    </div>
                </SC.InfoRow>

                <SC.InfoRow>
                    <div>
                        <b>Tạm tính:</b>
                    </div>
                    <div>
                        <b>
                            {totalPrice.toLocaleString()}
                            <u>đ</u>
                        </b>
                    </div>
                </SC.InfoRow>

                <SC.PaymentButton onClick={checkout}>TIẾN HÀNH ĐẶT HÀNG</SC.PaymentButton>
            </SC.Container>
        </SC.OuterContainer>
    );
};

export default CartPayment;
