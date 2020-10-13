import styled from "styled-components";

const Loader = styled.div`
    z-index: 2;
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: gray;
    opacity: 0.2;
    display: flex;
    align-items: center;
`;

const SpinnerContainer = styled.div`
    width: 100%;
    padding: 30px;
    background-color: white;
    text-align: center;
    box-sizing: border-box;
    color: #727272;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
`;

export const SC = { Loader, SpinnerContainer };
