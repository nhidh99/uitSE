import axiosAuthClient from "../axios/axiosAuthClient";
import axiosPublicClient from "../axios/axiosPublicClient";

type IncludeType = {
    [key: string]: boolean;
    images: boolean;
    ratings: boolean;
    comments: boolean;
    promotions: boolean;
    suggestions: boolean;
};

const laptopApi = {
    getByCategory: (category: string, page: number) => {
        const url = `/laptops/${category}`;
        const config = { params: { page: page } };
        return axiosPublicClient.get(url, config);
    },

    getByIds: (ids: number[]) => {
        const url = "/laptops";
        const config = { params: { ids: ids } };
        return axiosPublicClient.get(url, config);
    },

    getDetailById: (id: number) => {
        const url = `/laptops/${id}/details`;
        return axiosPublicClient.get(url);
    },

    getSpecById: (id: number) => {
        const url = `/laptops/${id}/spec`;
        return axiosPublicClient.get(url);
    },

    getByFilter(params: object) {
        const url = "/laptops/filter";
        const config = { params: params };
        return axiosPublicClient.get(url, config);
    },

    getByPage(params: object) {
        const url = "/laptops/search";
        const config = { params: params };
        return axiosAuthClient.get(url, config);
    },
};

export default laptopApi;
