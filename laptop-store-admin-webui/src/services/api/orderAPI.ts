import OrderItemModel from "@/types/model/OrderItemModel";
import ListFetchParams from "@/types/params/ListFetchParams";
import { AxiosResponse } from "axios";
import axiosClient from "../axios/axiosClient";

const orderAPI = {
    getByPage: (params: ListFetchParams): Promise<AxiosResponse<OrderItemModel[]>> => {
        const url = "/orders/search";
        const config = { params: params };
        return axiosClient.get(url, config);
    },
};

export default orderAPI;