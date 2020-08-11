import React from "react";
import { Link } from "react-router-dom";
import { Label } from "reactstrap";
import { FaLaptopCode } from "react-icons/fa";
import styles from "./styles.module.scss";
import store from "../../../../../../services/redux/store";
import { closeFilter } from "../../../../../../services/redux/actions";

const BannerLogo = () => {
    const closeSearchFilter = () => {
        store.dispatch(closeFilter());
    };

    return (
        <Link className={styles.logo} to="/" onClick={closeSearchFilter}>
            <FaLaptopCode color="white" size={35} />
            <Label className={styles.name}>Laptop Store</Label>
        </Link>
    );
};

export default BannerLogo;
