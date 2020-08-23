import axios from "axios";
import axiosClient from "./axiosClient";
import queryString from "query-string";
import { getCookie } from "../helper/cookie";

const addressClient = axios.create({
    baseURL: "/api/locations",
    paramsSerializer: (params) => queryString.stringify(params),
});

const addressApi = {
    getCities: () => {
        const url = "/cities";
        return addressClient.get(url);
    },

    getDistricts: (cityId) => {
        const url = `/districts?city_id=${cityId}`;
        return addressClient.get(url);
    },

    getWards: (districtId) => {
        const url = `/wards?district_id=${districtId}`;
        return addressClient.get(url);
    },

    getById: (id) => {
        const url = `/addresses/${id}`;
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.get(url, config);
    },

    postAddress: (data) => {
        const url = "/addresses";
        const config = {
            headers: {
                Authorization: `Bearer ${getCookie("access_token")}`,
                "Content-Type": "application/json",
            },
        };
        return axiosClient.post(url, data, config);
    },

    putAddress: (id, data) => {
        const url = `/addresses/${id}`;
        const config = {
            headers: {
                Authorization: `Bearer ${getCookie("access_token")}`,
                "Content-Type": "application/json",
            },
        };
        return axiosClient.put(url, data, config);
    },

    putDefaultAddress: (id) => {
        const url = `/addresses/${id}/default`;
        const data = { id: id };
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.put(url, data, config);
    },

    deleteAddress: (id) => {
        const url = `/addresses/${id}`;
        const config = {
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        };
        return axiosClient.delete(url, config);
    },
};

export default addressApi;
