import PromotionItemModel from "@/types/model/PromotionItemModel";
import ListFetchParams from "@/types/params/ListFetchParams";
import { AxiosResponse } from "axios";
import axiosClient from "../axios/axiosClient";

const promotionAPI = {
    getByPage(params: ListFetchParams): Promise<AxiosResponse<PromotionItemModel[]>> {
        const url = "/promotions/search";
        const config = { params: params };
        return axiosClient.get(url, config);
    },
};

export default promotionAPI;