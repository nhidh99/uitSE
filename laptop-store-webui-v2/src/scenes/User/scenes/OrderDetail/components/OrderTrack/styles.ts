import styled from "styled-components";

const Step = styled.div`
    border-radius: 3px;
    width: 18px;
    height: 18px;
    line-height: 18px;
    padding: 2px;
    text-align: center;
    color: white;
    background-color: #aaa;
    margin-right: 10px;
`;

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const LeftContainer = styled.div`
    min-width: 350px;
`;

const RightContainer = styled.div`
    word-spacing: 10px;
`;

export const SC = { Container, Step, LeftContainer, RightContainer };
