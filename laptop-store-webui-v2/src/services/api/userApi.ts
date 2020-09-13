import axiosClient from "./axiosClient";

const userApi = {
    getCurrentUserInfo: () => {
        const url = "/users/me";
        return axiosClient.get(url);
    },
};

export default userApi;
