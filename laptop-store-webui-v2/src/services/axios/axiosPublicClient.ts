import axios from "axios";
import queryString from "query-string";

const axiosPublicClient = axios.create({
    baseURL: "/api",
    paramsSerializer: (params) =>
        queryString.stringify(params, { arrayFormat: "comma" }),
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
        // Handle errors
        throw error;
    }
);

export default axiosPublicClient;
