import React from "react";
import { FaLaptopCode } from "react-icons/fa";
import { SC } from "./styles";

const BannerLogo = () => {
    return (
        <a href="/">
            <SC.Container>
                <FaLaptopCode color="white" size={35} />
                <SC.Label>Laptop Store</SC.Label>
            </SC.Container>
        </a>
    );
};

export default BannerLogo;
