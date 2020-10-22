import React from "react";
import "react-placeholder/lib/reactPlaceholder.css";
import ReactPlaceholder from "react-placeholder/lib";
import { SC } from "./styles";

const EmptyItem = () => (
    <SC.Container>
        <SC.ImageHolder
            children={null}
            type="rect"
            showLoadingAnimation={true}
            ready={false}
        />

        {[...Array(4)].map((_) => (
            <ReactPlaceholder
                type="textRow"
                showLoadingAnimation={true}
                ready={false}
                children={null}
            />
        ))}
    </SC.Container>
);

export default EmptyItem;
