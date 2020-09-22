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

    getById: (id: number, includes: IncludeType) => {
        const url = `/laptops/${id}`;
        if (!includes) {
            return axiosPublicClient.get(url);
        }
        const params = Object.keys(includes).filter((key) => includes[key]);
        const config = {
            params: { include: params },
        };
        return axiosPublicClient.get(url, config);
    },
};

export default laptopApi;
