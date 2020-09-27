/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import Spinner from "../../../../components/Spinner";
import userApi from "../../../../services/api/userApi";
import store from "../../../../services/redux/store";
import AddressModel from "../../../../values/models/AddressModel";
import AddButton from "./components/AddButton";
import AddressBlock from "./components/AddressBlock";

const AddressPage = () => {
    const [addresses, setAddresses] = useState<AddressModel[] | null>(null);
    const userDefaultAddressId = useMemo(
        () => store.getState().user?.address_id,
        []
    );

    useEffect(() => {
        const loadData = async () => {
            const response = await userApi.getCurrentUserAddresses();
            let data: AddressModel[] = response.data;

            if (userDefaultAddressId) {
                const defaultAddress = data.filter(
                    (a) => a.id === userDefaultAddressId
                )[0];
                data = data.filter((a) => a.id !== userDefaultAddressId);
                data.unshift(defaultAddress);
            }
            setAddresses(data);
        };
        loadData();
    }, []); 

    return addresses ? (
        <>
            <AddButton />
            {addresses.map((address) => (
                <AddressBlock
                    address={address}
                    isDefaultAddress={address.id === userDefaultAddressId}
                />
            ))}
        </>
    ) : (
        <Spinner />
    );
};

export default AddressPage;
