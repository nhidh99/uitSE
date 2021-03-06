import ProductItemModel from "@/types/model/ProductItemModel";
import ListFetchParams from "@/types/params/ListFetchParams";
import { AxiosResponse } from "axios";
import axiosClient from "../axios/axiosClient";

const productAPI = {
    getByPage(params: ListFetchParams): Promise<AxiosResponse<ProductItemModel[]>> {
        const url = "/laptops/search";
        const config = { params: params };
        return axiosClient.get(url, config);
    },
};

export default productAPI;