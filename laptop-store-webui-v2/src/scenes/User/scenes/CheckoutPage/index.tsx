import React, { useEffect, useMemo, useState } from "react";
import { FaAddressBook, FaGift, FaLaptop, FaShoppingBag, FaTruck } from "react-icons/fa";
import SectionHeader from "../../../../components/SectionHeader";
import userApi from "../../../../services/api/userApi";
import OrderCheckoutModel from "../../../../values/models/OrderCheckoutModel";
import CheckoutItem from "./components/CheckoutItem";
import DeliveryAddress from "./components/DeliveryAddress";
import { SC } from "./styles";

type CheckoutPageState = {
    loading: boolean;
    checkout: OrderCheckoutModel;
};

const CheckoutPage = () => {
    const initialState = useMemo<CheckoutPageState>(
        () => ({
            loading: false,
            checkout: {
                transport_fee: 0,
                laptop_count: 0,
                promotion_count: 0,
                total_price: 0,
                laptop_price: 0,
                promotion_price: 0,
                order_date: "",
                delivery_date: "",
                items: [],
            },
        }),
        []
    );

    const [state, setState] = useState<CheckoutPageState>(initialState);

    useEffect(() => {
        const loadData = async () => {
            const response = await userApi.getCurrentUserCheckout();
            setState({ loading: true, checkout: response.data });
        };
        loadData();
    }, []);

    const { loading, checkout } = state;

    return (
        <SC.OuterContainer>
            <SC.LeftContainer>
                <SC.Header>Thông tin đơn hàng</SC.Header>
                <SC.SectionContainer>
                    <SectionHeader
                        left={
                            <>
                                <FaAddressBook />
                                Địa chỉ giao hàng
                            </>
                        }
                    />
                    <DeliveryAddress />
                </SC.SectionContainer>

                <SC.SectionContainer>
                    <SectionHeader
                        left={
                            <>
                                <FaLaptop />
                                Danh sách sản phẩm
                            </>
                        }
                        right={
                            <b>
                                {checkout.laptop_count} sản phẩm |{" "}
                                {checkout.laptop_price.toLocaleString()}
                                <u>đ</u>
                            </b>
                        }
                    />
                    <SC.ItemList>
                        {checkout.items
                            .filter((item) => item.type === "LAPTOP")
                            .map((item) => (
                                <CheckoutItem item={item} />
                            ))}
                    </SC.ItemList>
                </SC.SectionContainer>

                <SC.SectionContainer>
                    <SectionHeader
                        left={
                            <>
                                <FaGift />
                                Danh sách khuyến mãi
                            </>
                        }
                        right={
                            <b>
                                {checkout.promotion_count} khuyến mãi |{" "}
                                {checkout.promotion_price.toLocaleString()}
                                <u>đ</u>
                            </b>
                        }
                    />
                    <SC.ItemList>
                        {checkout.items
                            .filter((item) => item.type === "PROMOTION")
                            .map((item) => (
                                <CheckoutItem item={item} />
                            ))}
                    </SC.ItemList>
                </SC.SectionContainer>
            </SC.LeftContainer>

            <SC.RightContainer>
                <SC.Header>Thông tin thanh toán</SC.Header>
                <SC.SectionContainer>
                    <SectionHeader
                        left={
                            <>
                                <FaTruck />
                                Thông tin vận chuyển
                            </>
                        }
                    />
                    <SC.ItemList>
                        <SC.InfoRow>
                            <div>
                                <b>Ngày đặt hàng:</b>
                            </div>
                            <div>{checkout.order_date}</div>
                        </SC.InfoRow>

                        <SC.InfoRow>
                            <div>
                                <b>Dự kiến giao:</b>
                            </div>
                            <div>{checkout.delivery_date}</div>
                        </SC.InfoRow>

                        <SC.InfoRow>
                            <div>
                                <b>Phí vận chuyển:</b>
                            </div>
                            <div>
                                {checkout.transport_fee.toLocaleString()}
                                <u>đ</u>
                            </div>
                        </SC.InfoRow>

                        <SC.InfoRow>
                            <div>
                                <b>Tạm tính:</b>
                            </div>
                            <div>
                                <b>
                                    {checkout.laptop_price.toLocaleString()}
                                    <u>đ</u>
                                </b>
                            </div>
                        </SC.InfoRow>
                    </SC.ItemList>
                </SC.SectionContainer>

                <SC.SectionContainer>
                    <SectionHeader
                        left={
                            <>
                                <FaShoppingBag />
                                Chi tiết thanh toán
                            </>
                        }
                    />
                    <SC.ItemList>
                        <SC.InfoRow>
                            <div>
                                <b>Tổng thanh toán:</b>
                            </div>
                            <SC.TotalPrice>
                                {checkout.total_price.toLocaleString()}
                                <u>đ</u>
                            </SC.TotalPrice>
                        </SC.InfoRow>

                        <SC.SubmitButton>ĐẶT HÀNG</SC.SubmitButton>
                    </SC.ItemList>
                </SC.SectionContainer>
            </SC.RightContainer>
        </SC.OuterContainer>
    );
};

export default CheckoutPage;
