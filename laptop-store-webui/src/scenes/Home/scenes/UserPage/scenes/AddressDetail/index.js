/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from "react";
import { FaBook } from "react-icons/fa";
import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import AddressDefault from "./components/AddressDefault";
import AddressForm from "./components/AddressForm";

const AddressDetail = () => {
    const AddressHeader = () => {
        const { id } = useParams();
        const title = id === "create" ? "THÊM ĐỊA CHỈ" : "SỬA ĐỊA CHỈ";
        return (
            <header className={styles.header}>
                <FaBook /> &nbsp;&nbsp;{title}
                <AddressDefault />
            </header>
        );
    };

    return (
        <Fragment>
            <AddressHeader />
            <AddressForm />
        </Fragment>
    );
};

export default AddressDetail;
