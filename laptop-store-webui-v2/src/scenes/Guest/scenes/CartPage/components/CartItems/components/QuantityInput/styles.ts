import styled from "styled-components";
import NumberFormat from "react-number-format";

const Container = styled.div`
    height: 35px;
    display: flex;
    border-radius: 5px;
`;

const Button = styled.button`
    border: 1px solid #ddd;
    height: 100%;
    background-color: #f3f3f3;
    padding: 10px;
    text-align: center;
    height: 100%;
    padding: 0 10px;
    font-size: 18px;
    cursor: pointer;

    :first-of-type {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    :last-of-type {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
`;

const Input = styled(NumberFormat)`
    width: 50px;
    border-radius: 0;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    border-left: none;
    border-right: none;
    text-align: center;
    padding-top: 5px;
`;

export const SC = { Container, Input, Button };
