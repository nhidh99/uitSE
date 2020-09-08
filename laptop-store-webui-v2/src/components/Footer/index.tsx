import React from "react";
import { SC } from "./styles";
import LeftFooter from "./components/LeftFooter";
import RightFooter from "./components/RightFooter";

const Footer = () => (
    <SC.OuterContainer>
        <SC.InnerContainer>
            <LeftFooter />
            <RightFooter />
        </SC.InnerContainer>
    </SC.OuterContainer>
);

export default Footer;
