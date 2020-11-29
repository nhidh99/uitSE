import RatingFormValues from "../../values/forms/RatingFormValues";
import axiosAuthClient from "../axios/axiosAuthClient";
import axiosPublicClient from "../axios/axiosPublicClient";

const ratingApi = {
    getByProductId(productId: number, page: number) {
        const url = "/ratings";
        const config = { params: { product_id: productId, page: page } };
        return axiosPublicClient.get(url, config);
    },

    getByStatus(params: object) {
        const url = "/ratings";
        const config = { params: params };
        return axiosAuthClient.get(url, config);
    },

    postRating(data: RatingFormValues) {
        const url = "/ratings";
        return axiosAuthClient.post(url, data);
    },
};

export default ratingApi;
