/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import { SC } from "./styles";
import EmptyBlock from "../../../../components/EmptyBlock";
import userApi from "../../../../services/api/userApi";
import { fireFetching, skipFetching } from "../../../../services/redux/slices/loaderStatusSlice";
import store from "../../../../services/redux/store";
import AddressModel from "../../../../values/models/AddressModel";
import AddButton from "./components/AddButton";
import AddressBlock from "./components/AddressBlock";

const AddressPage = () => {
    const [addresses, setAddresses] = useState<AddressModel[] | null>(null);
    const userDefaultAddressId = useMemo(() => store.getState().user?.address_id, []);

    useEffect(() => {
        const loadData = async () => {
            store.dispatch(fireFetching());
            const response = await userApi.getCurrentUserAddresses();
            setAddresses(response.data);
            store.dispatch(skipFetching());
        };
        loadData();
    }, []);

    return addresses ? (
        <>
            <AddButton />
            {addresses.length === 0 ? (
                <SC.EmptyContainer>
                    <EmptyBlock icon={<FaAddressBook />} title="Sổ địa chỉ trống" paddingless />
                </SC.EmptyContainer>
            ) : (
                addresses.map((address) => (
                    <AddressBlock
                        address={address}
                        isDefaultAddress={address.id === userDefaultAddressId}
                    />
                ))
            )}
        </>
    ) : null;
};

export default AddressPage;
