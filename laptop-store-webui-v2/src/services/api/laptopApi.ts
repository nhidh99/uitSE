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

    getByFilter(url: string) {
        return axiosPublicClient.get(url);
    },

    getByName(name: string, sort: string, page: number) {
        const url = "/laptops/search";
        const config = { params: { page: page, name: name, sort: sort } };
        return axiosPublicClient.get(url, config);
    },
};

export default laptopApi;
