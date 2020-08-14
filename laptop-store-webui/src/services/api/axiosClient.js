import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
    baseURL: "/api",
    paramsSerializer: (params) =>
        queryString.stringify(params, { arrayFormat: "comma" }),
});

axiosClient.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors
        throw error;
    }
);

export default axiosClient;
