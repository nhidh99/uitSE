import axiosAuthClient from "../axios/axiosAuthClient";

const promotionApi = {
    getByPage(params: object) {
        const url = "/promotions/search";
        const config = { params: params };
        return axiosAuthClient.get(url, config);
    },
};

export default promotionApi;
