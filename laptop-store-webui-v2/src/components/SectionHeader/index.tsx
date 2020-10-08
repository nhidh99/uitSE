import React, { ReactNode } from "react";
import { SC } from "./style";

type SectionHeaderProps = {
    left: ReactNode;
    right?: ReactNode;
};

const SectionHeader = ({ left, right }: SectionHeaderProps) => {
    return (
        <SC.Container>
            <SC.LeftContainer>{left}</SC.LeftContainer>
            {right ? <SC.RightContainer>{right}</SC.RightContainer> : null}
        </SC.Container>
    );
};

export default SectionHeader;
