import axiosPublicClient from "../axios/axiosPublicClient";

const locationApi = {
    getCities: () => {
        const url = "/locations/cities";
        return axiosPublicClient.get(url);
    },

    getDistrictsByCityId: (cityId: number) => {
        const url = "locations/districts";
        const config = { params: { city_id: cityId } };
        return axiosPublicClient.get(url, config);
    },

    getWardsByDistrictId: (districtId: number) => {
        const url = "/locations/wards";
        const config = { params: { district_id: districtId } };
        return axiosPublicClient.get(url, config);
    },
};

export default locationApi;
