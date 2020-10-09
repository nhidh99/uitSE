import styled from "styled-components";

const Loader = styled.div`
    z-index: 2;
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
    background-color: gray;
    opacity: 0.2;
    display: flex;
    align-items: center;
`;

const SpinnerContainer = styled.div`
    width: 100%;
    padding: 20px;
    background-color: white;
    text-align: center;
    box-sizing: border-box;
`;

export const SC = { Loader, SpinnerContainer };
