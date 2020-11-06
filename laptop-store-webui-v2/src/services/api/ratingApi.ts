import axiosPublicClient from "../axios/axiosPublicClient";

const ratingApi = {
    getByProductId(productId: number, page: number) {
        const url = "/ratings";
        const config = { params: { product_id: productId, page: page } };
        return axiosPublicClient.get(url, config);
    },
};

export default ratingApi;
