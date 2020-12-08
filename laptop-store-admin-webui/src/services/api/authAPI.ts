import LoginFormData from "@/types/form/LoginFormData";
import axios from "axios";
import axiosClient from "../axios/axiosClient";

export const authAPI = {
    postLogin: (data: LoginFormData) => {
        const url = "/api/auth/login";
        const config = { headers: { "Content-Type": "application/json" } };
        return axios.post(url, data, config);
    },

    getRefreshToken: () => {
        const url = "/auth/token";
        return axiosClient.get(url);
    }
};
