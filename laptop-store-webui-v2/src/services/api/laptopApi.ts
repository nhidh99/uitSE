import axiosClient from "./axiosClient";

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
        return axiosClient.get(url, config);
    },

    getById: (id: number, includes: IncludeType) => {
        const url = `/laptops/${id}`;
        if (!includes) {
            return axiosClient.get(url);
        }
        const params = Object.keys(includes).filter((key) => includes[key]);
        const config = {
            params: { include: params },
        };
        return axiosClient.get(url, config);
    },
};

export default laptopApi;
