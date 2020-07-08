import axios from "axios";
import queryString from "query-string";

const addressClient = axios.create({
    baseURL:
        "https://raw.githubusercontent.com/nhidh99/uitSE/master/laptop-store/laptop-store-addresses/",
    paramsSerializer: (params) => queryString.stringify(params),
});

const addressApi = {
    getCities: () => {
        const url = "/cities.json";
        return addressClient.get(url);
    },

    getDistricts: (cityId) => {
        const url = `/districts/${cityId}.json`;
        return addressClient.get(url);
    },

    getWards: (districtId) => {
        const url = `/wards/${districtId}.json`;
        return addressClient.get(url);
    },
};

export default addressApi;
