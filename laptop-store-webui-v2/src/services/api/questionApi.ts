import QuestionFormValues from "../../values/forms/QuestionFormValues";
import axiosAuthClient from "../axios/axiosAuthClient";
import axiosPublicClient from "../axios/axiosPublicClient";

const questionApi = {
    getByProductId(productId: number, page: number) {
        const url = "/questions";
        const config = { params: { product_id: productId, page: page } };
        return axiosPublicClient.get(url, config);
    },

    getByStatus(params: object) {
        const url = "/questions";
        const config = { params: params };
        return axiosAuthClient.get(url, config);
    },

    postQuestion(data: QuestionFormValues) {
        const url = "/questions";
        return axiosAuthClient.post(url, data);
    },
};

export default questionApi;
