import React from "react";
import BannerLogo from "./components/BannerLogo";
import BannerSearch from "./components/BannerSearch";
import { SC } from "./styles";

const BannerLeft = () => (
    <SC.Container>
        <BannerLogo />
        <BannerSearch />
    </SC.Container>
);

export default BannerLeft;
