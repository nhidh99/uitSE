import { ErrorMessage, Field } from "formik";
import styled from "styled-components";

const Container = styled.div`
    border-radius: 5px;
    margin-bottom: 12px;
    display: flex;
`;

const IconContainer = styled.span`
    font-size: 16px;
    padding: 10px;
    background-color: #ddd;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;

    svg {
        margin-bottom: -2px;
    }
`;

const Input = styled(Field)`
    border: none;
    padding: 10px;
    border: 1px solid #ddd;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    font-size: 16px;
    width: 100%;
    color: #333;
`;

const Error = styled(ErrorMessage)`
    color: red;
    font-size: 12px;
    text-align: left;
    margin: -6px 0 8px 0;
`;

export const SC = {
    Container,
    IconContainer,
    Input,
    Error,
};
