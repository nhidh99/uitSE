import React from "react";
import BannerLeft from "./components/BannerLeft";
import BannerRight from "./components/BannerRight";
import { SC } from "./styles";

const Banner = () => (
    <SC.OuterContainer>
        <SC.InnerContainer>
            <BannerLeft />
            <BannerRight />
        </SC.InnerContainer>
    </SC.OuterContainer>
);

export default Banner;
