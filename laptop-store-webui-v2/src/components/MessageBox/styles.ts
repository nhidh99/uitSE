import styled from "styled-components";

const Container = styled.div`
    padding: 15px 20px 10px 20px;
    position: fixed;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 0%);
    z-index: 5;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    background-color: #666;
    color: white;
`;

export const SC = { Container };
