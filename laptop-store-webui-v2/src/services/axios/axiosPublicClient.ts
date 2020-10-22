import axios from "axios";
import queryString from "query-string";
import { setMessage } from "../redux/slices/messageSlice";
import store from "../redux/store";

const axiosPublicClient = axios.create({
    baseURL: "/api",
    paramsSerializer: (params) => queryString.stringify(params, { arrayFormat: "comma" }),
});

axiosPublicClient.interceptors.request.use(async (config) => {
    const contentType = config.headers["Content-Type"];
    if (!contentType) {
        config.headers["Content-Type"] = "application/json";
    }
    return config;
});

axiosPublicClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        store.dispatch(setMessage(error.response.data));
        throw error;
    }
);

export default axiosPublicClient;
