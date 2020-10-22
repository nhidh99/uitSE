import React from "react";
import { SC } from "./styles";
import { FaFacebook, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";

const RightFooter = () => (
    <SC.Container>
        <SC.Header>Liên hệ với store</SC.Header>
        <SC.IconContainer>
            <FaFacebook />
            <FaGithub />
            <FaInstagram />
            <FaYoutube />
        </SC.IconContainer>
    </SC.Container>
);

export default RightFooter;