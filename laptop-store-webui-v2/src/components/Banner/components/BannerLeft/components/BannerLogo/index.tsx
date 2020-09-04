import React from "react";
import { FaLaptopCode } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SC } from "./styles";

const BannerLogo = () => {
    return (
        <Link to="/">
            <SC.Container>
                <FaLaptopCode color="white" size={35} />
                <SC.Label>Laptop Store</SC.Label>
            </SC.Container>
        </Link>
    );
};

export default BannerLogo;
