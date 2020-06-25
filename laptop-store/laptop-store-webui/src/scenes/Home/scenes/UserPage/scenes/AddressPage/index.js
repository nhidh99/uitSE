/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { Button } from "reactstrap";
import { FaBook, FaNewspaper } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import AddressBlock from "./components/AddressBlock";
import { getCookie } from "../../../../../../services/helper/cookie";
import store from "../../../../../../services/redux/store";
import EmptyBlock from "../../../../../../components/EmptyBlock";

const AddressPage = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const defaultAddressId = store.getState()["address"]["default-id"];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const response = await fetch("/cxf/api/users/me/addresses", {
            method: "GET",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });

        if (response.ok) {
            const data = await response.json();
            const defaultAddress = data.find((address) => address.id === defaultAddressId);
            const addresses = data.filter((address) => address !== defaultAddress);
            if (defaultAddress) {
                addresses.unshift(defaultAddress);
            }
            setAddresses(addresses);
            setLoading(false);
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
                    <AddressBlock address={address} isDefault={defaultAddressId === address.id} />
                ))
            )}
        </Fragment>
    );
};

export default AddressPage;
