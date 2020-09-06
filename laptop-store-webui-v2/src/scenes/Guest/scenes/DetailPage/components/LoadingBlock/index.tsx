import React from "react";
import { SC } from "./styles";

const LoadingBlock = () => (
    <>
        <SC.TextHolder
            type="textRow"
            showLoadingAnimation
            children={null}
            ready={false}
        />

        <SC.RectHolder
            type="rect"
            showLoadingAnimation
            children={null}
            ready={false}
        />
    </>
);

export default LoadingBlock;
