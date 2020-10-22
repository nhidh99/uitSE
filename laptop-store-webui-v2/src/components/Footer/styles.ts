import styled from "styled-components";

const OuterContainer = styled.footer`
    background-color: #333;
    display: block;
    padding: 10px 0;
`;

const InnerContainer = styled.div`
    margin: 0 auto;
    color: white;
    display: flex;
    width: 1200px;
    justify-content: space-between;
    align-items: center;
`;

export const SC = {
    OuterContainer,
    InnerContainer,
};
