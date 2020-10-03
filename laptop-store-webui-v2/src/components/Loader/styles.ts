import styled from "styled-components";

const Loader = styled.div`
    z-index: 2;
    width: 100%;
    height: 100%;
    position: absolute;
    transform-style: preserve-3d;
    background-color: gray;
    opacity: 0.4;
    display: flex;
    align-items: center;
`;

export const SC = { Loader };
