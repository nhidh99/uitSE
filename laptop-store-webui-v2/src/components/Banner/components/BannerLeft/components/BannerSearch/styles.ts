import styled from "styled-components";

const Container = styled.div`
    width: 350px;
    display: flex;
    background-color: white;
    border-radius: 5px;
    padding: 5px;
    margin-left: 15px;
`;

const IconContainer = styled.span`
    text-align: center;
    padding: 0 8px;
    color: gray;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
`;

const Input = styled.input`
    border: none;
    color: #495057;
    width: 100%;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    padding: 0 5px;
`;

export const SC = {
    Container,
    IconContainer,
    Input,
};
