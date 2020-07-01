import axiosClient from "./axiosClient";
import { getCookie } from "../helper/cookie";

class LaptopApi {
    getByPage = (page) => {
        const url = "/laptops";
        const config = {
            params: { page: page },
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.get(url, config);
    };

    getByQuery = (query, page) => {
        const url = "/laptops/search";
        const config = {
            params: { q: query, page: page },
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.get(url, config);
    };

    getByFilter = (filter) => {
        const url = "/laptops/filter";
        const config = { params: filter };
        return axiosClient.get(url, config);
    };

    getByCategory = (category, page) => {
        const url = `/laptops/${category}`;
        const config = { params: { page: page } };
        return axiosClient.get(url, config);
    };

    deleteById = (id) => {
        const url = `/laptops/${id}`;
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.delete(url, config);
    };

    postLaptop = (data) => {
        const url = "/laptops";
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
        };
        return axiosClient.post(url, data, config);
    };

    putLaptop = (id, data) => {
        const url = `/laptops/${id}`;
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
        };
        return axiosClient.put(url, data, config);
    };
}

const laptopApi = new LaptopApi();
export default laptopApi;
