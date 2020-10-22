import styled from "styled-components";

const Container = styled.div`
    background-color: white;
    display: flex;
    padding: 15px;
    gap: 15px;
`;

const Input = styled.input`
    flex: 8;
    padding: 10px;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

const Button = styled.button`
    flex: 1;
    border-radius: 5px;
    padding: 10px;
    border: none;
    color: white;
    background-color: #5cb85c;

    svg {
        margin-bottom: -2px;
    }
`;

export const SC = {
    Container,
    Input,
    Button,
};
