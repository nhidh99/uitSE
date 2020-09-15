/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { Button } from "reactstrap";
import { FaBook, FaNewspaper } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import AddressBlock from "./components/AddressBlock";
import store from "../../../../../../services/redux/store";
import EmptyBlock from "../../../../../../components/EmptyBlock";
import userApi from "../../../../../../services/api/userApi";
import { buildErrorModal } from "../../../../../../services/redux/actions";

const AddressPage = () => {
    const INITIAL_STATE = { addresses: [], loading: true };
    const [state, setState] = useState(INITIAL_STATE);
    const defaultAddressId = store.getState()["user"]["address_id"];
    const { addresses, loading } = state;

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await userApi.getCurrentUserAddresses();
            const data = response.data;
            const defaultAddress = data.find((a) => a.id === defaultAddressId);
            const addresses = data.filter((a) => a !== defaultAddress);
            if (defaultAddress) {
                addresses.unshift(defaultAddress);
            }
            setState({ addresses: addresses, loading: false });
        } catch (err) {
            store.dispatch(buildErrorModal());
        }
    };

    return (
        <Fragment>
            <div className={styles.title}>
                <label className={styles.header}>
                    <FaBook />
                    &nbsp;&nbsp;SỔ ĐỊA CHỈ
                </label>

                <Link to={{ pathname: "/user/address/create" }}>
                    <Button color="success" className={styles.submit}>
                        Thêm địa chỉ
                    </Button>
                </Link>
            </div>

            {addresses.length === 0 ? (
                <EmptyBlock
                    loading={loading}
                    icon={<FaNewspaper />}
                    loadingText="Đang tải sổ địa chỉ"
                    emptyText="Sổ địa chỉ trống"
                />
            ) : (
                addresses.map((address) => (
                    <AddressBlock
                        address={address}
                        isDefault={defaultAddressId === address.id}
                    />
                ))
            )}
        </Fragment>
    );
};

export default AddressPage;
