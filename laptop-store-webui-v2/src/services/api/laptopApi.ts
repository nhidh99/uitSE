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

    getById: (id: number) => {
        const url = `/laptops/${id}`;
        const includes: IncludeType = {
            images: true,
            ratings: true,
            comments: true,
            promotions: true,
            suggestions: true,
        };
        const params = Object.keys(includes).filter((key) => includes[key]);
        const config = {
            params: { include: params },
        };
        return axiosPublicClient.get(url, config);
    },
};

export default laptopApi;
