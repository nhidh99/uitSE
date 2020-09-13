import { LoginFormValues, RegisterFormValues } from "../../global/formValues";
import axiosClient from "./axiosClient";

export const authApi = {
    postLogin: (data: LoginFormValues) => {
        const url = "/auth/login";
        return axiosClient.post(url, data);
    },

    postRegister: (data: RegisterFormValues) => {
        const url = "/auth/register";
        return axiosClient.post(url, data);
    },

    getRefreshToken: () => {
        const url = '/auth/token';
        return axiosClient.get(url);
    }
};
