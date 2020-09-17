import UserInfoFormValues from "../../values/forms/UserInfoFormValues";
import axiosClient from "./axiosClient";

const userApi = {
    getCurrentUserInfo: () => {
        const url = "/users/me";
        return axiosClient.get(url);
    },

    getCurrentUserAddresses: () => {
        const url = "/users/me/addresses";
        return axiosClient.get(url);
    },

    getCurrentUserOrders: (page: number) => {
        const url = "/users/me/orders";
        const config = { params: { page: page } };
        return axiosClient.get(url, config);
    },

    putCurrentUserInfo: (data: UserInfoFormValues) => {
        const url = "/users/me";
        return axiosClient.put(url, data);
    },
};

export default userApi;
