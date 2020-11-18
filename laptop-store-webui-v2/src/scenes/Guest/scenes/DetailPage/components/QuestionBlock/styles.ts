import styled from "styled-components";

const Container = styled.div`
    padding: 20px;
    background-color: white;
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
    cursor: pointer;

    :disabled {
        opacity: 0.5;
        cursor: unset;
    }

    svg {
        margin-bottom: -2px;
    }
`;

const FormContainer = styled.div`
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
`;

const ExampleList = styled.ul`
    padding-inline-start: 0;
    margin-bottom: 0;
    li {
        margin-left: 0;
        list-style-type: none;
        :not(:last-of-type) {
            margin-bottom: 5px;
        }
    }
`;

export const SC = {
    Container,
    Input,
    Button,
    FormContainer,
    ExampleList,
};
