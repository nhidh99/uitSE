import axiosAuthClient from "../axios/axiosAuthClient";

const orderApi = {
    getById: (id: number) => {
        const url = `/orders/${id}`;
        return axiosAuthClient.get(url);
    },

    postOrder: (addressId: number) => {
        const url = "/orders";
        const data = { addressId: addressId };
        return axiosAuthClient.post(url, data);
    },
};

export default orderApi;
