import AddressFormValues from "../../values/forms/AddressFormValues";
import axiosAuthClient from "../axios/axiosAuthClient";

const addressApi = {
    getAddressById: (id: number) => {
        const url = `/addresses/${id}`;
        return axiosAuthClient.get(url);
    },

    postAddress: (values: AddressFormValues) => {
        const url = "/addresses";
        return axiosAuthClient.post(url, values);
    },

    deleteAddress: (id: number) => {
        const url = `/addresses/${id}`;
        return axiosAuthClient.delete(url);
    },

    putAddress: (id: number, values: AddressFormValues) => {
        const url = `addresses/${id}`;
        return axiosAuthClient.put(url, values);
    },
};

export default addressApi;
