/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Spinner from "../../../../components/Spinner";
import userApi from "../../../../services/api/userApi";
import AddressModel from "../../../../values/models/AddressModel";
import AddButton from "./components/AddButton";
import AddressBlock from "./components/AddressBlock";

const AddressPage = () => {
    const [addresses, setAddresses] = useState<AddressModel[] | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const response = await userApi.getCurrentUserAddresses();
            setAddresses(response.data);
        };
        loadData();
    }, []);

    return addresses ? (
        <>
            <AddButton />
            {addresses.map((address) => (
                <AddressBlock address={address} />
            ))}
        </>
    ) : (
        <Spinner />
    );
};

export default AddressPage;
