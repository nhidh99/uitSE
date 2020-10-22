import React from "react";
import store from "../../../../../../../../services/redux/store";
import { Button } from "reactstrap";
import { FaBook } from "react-icons/fa";
import styles from "./styles.module.scss";
import { useParams } from "react-router-dom";
import addressApi from "../../../../../../../../services/api/addressApi";
import {
    buildErrorModal,
    buildModal,
    setDefaultAddressId,
} from "../../../../../../../../services/redux/actions";
import { useSelector } from "react-redux";

const AddressDefault = () => {
    const { id } = useParams();
    const show = useSelector((state) => {
        const defaultAddressId = state.user.address_id;
        return id !== "create" && defaultAddressId !== parseInt(id);
    });

    const submit = async () => {
        try {
            const addressId = parseInt(id);
            await addressApi.putDefaultAddress(addressId);
            const modal = {
                title: "Lưu thành công",
                message: "Đã lưu địa chỉ mặc định",
                confirm: () => null,
            };
            store.dispatch(setDefaultAddressId(addressId));
            store.dispatch(buildModal(modal));
        } catch (err) {
            store.dispatch(buildErrorModal());
        }
    };

    return show ? (
        <Button color="primary" className={styles.btn} onClick={submit}>
            <FaBook />
            &nbsp;&nbsp;Dat lam dia chi mac dinh
        </Button>
    ) : null;
};

export default AddressDefault;
