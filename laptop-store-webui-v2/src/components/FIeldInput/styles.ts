import styled from "styled-components";

const Container = styled.div`
    display: flex;
    gap: 10px;
`;

const Label = styled.label`
    font-weight: 600;
    margin-top: 10px;
    flex: 1;
`;

const InputContainer = styled.div`
    flex: 8;
    margin-bottom: 12px;

    input,
    select {
        border: none;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        box-sizing: border-box;
        font-size: 14px;
        color: #333;
        width: 100%;
    }
`;

const Error = styled.div`
    color: red;
    font-size: 12px;
    text-align: left;
    margin-top: 6px;
`;

export const SC = {
    Container,
    Label,
    InputContainer,
    Error,
};
