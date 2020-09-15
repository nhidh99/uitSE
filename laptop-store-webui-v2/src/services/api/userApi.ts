import UserInfoFormValues from "../../values/forms/UserInfoFormValues";
import axiosClient from "./axiosClient";

const userApi = {
    getCurrentUserInfo: () => {
        const url = "/users/me";
        return axiosClient.get(url);
    },

    putCurrentUserInfo: (data: UserInfoFormValues) => {
        const url = "/users/me";
        return axiosClient.put(url, data);
    },
};

export default userApi;
