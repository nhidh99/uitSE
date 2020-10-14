import { Form } from "formik";
import styled, { css } from "styled-components";

const Container = styled.div``;

const inputStyle = css`
    display: block;
    margin-bottom: 10px;
    cursor: pointer;

    input {
        margin: 0 8px 0 2px;
        transform: scale(1.1);
    }
`;

const Header = styled.header`
    font-size: 18px;
    margin-bottom: 10px;
`;

const FilterForm = styled(Form)`
    background-color: white;
    border: 1px solid #ddd;
    padding: 20px;
    font-size: 16px;
`;

const Title = styled.header`
    font-weight: 600;
    margin-bottom: 10px;
    color: #bf081f;
    :not(:first-of-type) {
        margin-top: 10px;
    }
`;

const BrandGroup = styled.div`
    border-bottom: 1px dashed #ddd;
    display: flex;
    flex: 1 50%;
    flex-wrap: wrap;
    label {
        min-width: 50%;
        max-width: 50%;
        ${inputStyle}
    }
`;

const InputGroup = styled.div`
    border-bottom: 1px dashed #ddd;
    label {
        ${inputStyle}
    }
`;

const Button = styled.div`
    padding: 10px;
    color: white;
    background-color: #d9534f;
    margin-top: 10px;
    text-align: center;
    border-radius: 3px;
`;

export const SC = { Container, Header, Title, FilterForm, BrandGroup, InputGroup, Button };
