import PasswordFormValues from "../../values/forms/PasswordFormValues";
import UserInfoFormValues from "../../values/forms/UserInfoFormValues";
import axiosAuthClient from "../axios/axiosAuthClient";

const userApi = {
    getCurrentUserInfo: () => {
        const url = "/users/me";
        return axiosAuthClient.get(url);
    },

    getCurrentUserAddresses: () => {
        const url = "/users/me/addresses";
        return axiosAuthClient.get(url);
    },

    getCurrentUserOrders: (page: number) => {
        const url = "/users/me/orders";
        const config = { params: { page: page } };
        return axiosAuthClient.get(url, config);
    },

    putCurrentUserInfo: (data: UserInfoFormValues) => {
        const url = "/users/me";
        return axiosAuthClient.put(url, data);
    },

    putDefaultAddress: (addressId: number) => {
        const url = "/users/me/default-address";
        const data = { address_id: addressId };
        return axiosAuthClient.post(url, data);
    },

    putCurrentUserPassword: (data: PasswordFormValues) => {
        const url = "/users/me/password";
        return axiosAuthClient.put(url, data);
    },

    putCurrentUserCart: (cartJSON: string) => {
        const url = "/users/me/cart";
        const data = { cartJSON: cartJSON };
        return axiosAuthClient.put(url, data);
    },
};

export default userApi;
