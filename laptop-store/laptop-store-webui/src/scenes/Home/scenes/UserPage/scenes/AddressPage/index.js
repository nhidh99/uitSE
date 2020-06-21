/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Button, Spinner } from "reactstrap";
import { FaBook } from "react-icons/fa";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";
import AddressBlock from "./components/AddressBlock";
import { getCookie } from "../../../../../../services/helper/cookie";
import Loader from "react-loader-advanced";
import store from "../../../../../../services/redux/store";

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
        <Loader
            show={loading}
            message={<Spinner color="primary" />}
            className={styles.loader}
            backgroundStyle={{ backgroundColor: "transparent" }}
        >
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

            {addresses.map((address) => (
                <AddressBlock address={address} isDefault={defaultAddressId === address.id} />
            ))}
        </Loader>
    );
};

export default AddressPage;
