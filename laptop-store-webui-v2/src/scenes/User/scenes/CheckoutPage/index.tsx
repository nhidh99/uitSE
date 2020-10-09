/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
    FaAddressBook,
    FaGift,
    FaLaptop,
    FaPen,
    FaPlusCircle,
    FaShoppingBag,
    FaTruck,
} from "react-icons/fa";
import { useHistory } from "react-router";
import Loader from "../../../../components/Loader";
import SectionHeader from "../../../../components/SectionHeader";
import userApi from "../../../../services/api/userApi";
import AddressModel from "../../../../values/models/AddressModel";
import OrderCheckoutModel from "../../../../values/models/OrderCheckoutModel";
import CheckoutItem from "./components/CheckoutItem";
import DeliveryAddress from "./components/DeliveryAddress";
import { SC } from "./styles";

type CheckoutPageState = {
    loading: boolean;
    checkout: OrderCheckoutModel;
    addresses: AddressModel[];
};

const CheckoutPage = () => {
    const initialState = useMemo<CheckoutPageState>(
        () => ({
            loading: true,
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
            addresses: [],
        }),
        []
    );

    const history = useHistory();
    const [state, setState] = useState<CheckoutPageState>(initialState);
    const { loading, checkout, addresses } = state;

    useEffect(() => {
        const loadData = async () => {
            const [checkoutResponse, addressesResponse] = await Promise.all([
                userApi.getCurrentUserCheckout(),
                userApi.getCurrentUserAddresses(),
            ]);
            setState({
                loading: false,
                checkout: checkoutResponse.data,
                addresses: addressesResponse.data,
            });
        };
        loadData();
    }, []);

    const addAddress = useCallback(() => {
        history.push("/user/addresses/create");
    }, []);

    const editAddress = useCallback(() => {
        // @ts-ignore
        const addressId = document.getElementById("address")?.value;
        history.push(`/user/addresses/edit/${addressId}`);
    }, []);

    return (
        <SC.OuterContainer>
            {loading ? (
                <SC.LoaderContainer>
                    <SectionHeader
                        left={
                            <>
                                <FaShoppingBag />
                                Thông tin thanh toán
                            </>
                        }
                    />
                    <Loader loading={loading} loadOnce={true} />
                </SC.LoaderContainer>
            ) : (
                <>
                    <SC.LeftContainer>
                        <SC.SectionContainer>
                            <SectionHeader
                                left={
                                    <>
                                        <FaAddressBook />
                                        Địa chỉ giao hàng
                                    </>
                                }
                                right={
                                    <SC.EditAddressContainer>
                                        <SC.EditButton onClick={addAddress}>
                                            <FaPlusCircle />
                                            Thêm địa chỉ
                                        </SC.EditButton>

                                        {addresses.length > 0 ? (
                                            <SC.EditButton onClick={editAddress}>
                                                <FaPen />
                                                Chỉnh sửa
                                            </SC.EditButton>
                                        ) : null}
                                    </SC.EditAddressContainer>
                                }
                            />
                            <DeliveryAddress addresses={addresses} />
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
                </>
            )}
        </SC.OuterContainer>
    );
};

export default CheckoutPage;
