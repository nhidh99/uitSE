import ListFetchParams from "@/types/params/ListFetchParams";
import axiosClient from "../axios/axiosClient";

const productAPI = {
    getByPage(params: ListFetchParams) {
        const url = "/laptops/search";
        const config = { params: params };
        return axiosClient.get(url, config);
    },
};

export default productAPI;