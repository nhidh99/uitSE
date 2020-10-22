import LoginFormValues from "../../values/forms/LoginFormValues";
import RegisterFormValues from "../../values/forms/RegisterFormValues";
import axiosAuthClient from "../axios/axiosAuthClient";
import axiosPublicClient from "../axios/axiosPublicClient";

export const authApi = {
    postLogin: (data: LoginFormValues) => {
        const url = "/auth/login";
        return axiosPublicClient.post(url, data);
    },

    postRegister: (data: RegisterFormValues) => {
        const url = "/auth/register";
        return axiosPublicClient.post(url, data);
    },

    getRefreshToken: () => {
        const url = "/auth/token";
        return axiosAuthClient.get(url);
    },
};
