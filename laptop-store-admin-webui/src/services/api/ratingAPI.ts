import RatingItemModel from "@/types/model/RatingItemModel";
import ListFetchParams from "@/types/params/ListFetchParams";
import { AxiosResponse } from "axios";
import axiosClient from "../axios/axiosClient";

const ratingAPI = {
    getByPage(params: ListFetchParams): Promise<AxiosResponse<RatingItemModel[]>> {
        const url = "/ratings/search";
        const config = { params: params };
        return axiosClient.get(url, config);
    },
}

export default ratingAPI;