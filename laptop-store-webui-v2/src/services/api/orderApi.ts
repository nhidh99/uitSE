import axiosAuthClient from "../axios/axiosAuthClient";

const orderApi = {
    getById: (id: number) => {
        const url = `/orders/${id}`;
        return axiosAuthClient.get(url);
    },
};

export default orderApi;
