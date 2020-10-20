import styled from "styled-components";

const OuterContainer = styled.div`
    width: 100%;
    background-color: white;
    box-sizing: border-box;

    &.border {
        border: 1px solid #ddd;
        padding: 30px;
    }
`;

const InnerContainer = styled.div`
    text-align: center;
`;

const IconContainer = styled.div`
    font-size: 50px;
`;

export const SC = {
    OuterContainer,
    InnerContainer,
    IconContainer,
};
