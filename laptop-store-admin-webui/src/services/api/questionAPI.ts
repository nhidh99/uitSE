import QuestionItemModel from "@/types/model/QuestionItemModel";
import ListFetchParams from "@/types/params/ListFetchParams";
import { AxiosResponse } from "axios";
import axiosClient from "../axios/axiosClient";

const questionAPI = {
    getByPage(params: ListFetchParams): Promise<AxiosResponse<QuestionItemModel[]>> {
        const url = "/questions/search";
        const config = { params: params };
        return axiosClient.get(url, config);
    },
}

export default questionAPI;