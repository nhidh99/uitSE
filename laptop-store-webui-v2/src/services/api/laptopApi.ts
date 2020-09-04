import axiosClient from "./axiosClient";

const laptopApi = {
    getByCategory: (category: string, page: number) => {
        const url = `/laptops/${category}`;
        const config = { params: { page: page } };
        return axiosClient.get(url, config);
    },
};

export default laptopApi;
