import styled from "styled-components";

const LeftContainer = styled.div`
    align-items: center;
    flex: 1;
    max-width: calc(100% / 3);
`;

const RightContainer = styled.div`
    border-left: 1px solid #efefef;
    flex: 2;
`;

export const SC = {
    LeftContainer,
    RightContainer,
};
