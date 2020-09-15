import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;

    > button,
    input {
        margin-left: 15px;
    }
`;

const QuantityLabel = styled.label`
    font-weight: bold;
`;

const QuantityInput = styled.input`
    text-align: center;
    width: 100px !important;
    border-radius: 5px;
    border: 2px solid lightgray;
    padding: 10px;
`;

const CartButton = styled.button`
    border-radius: 5px;
    padding: 10px;
    color: white;
    background-color: #5cb85c;
    border: none;
    svg {
        margin-bottom: -2px;
    }
`;

const WishListButton = styled.button`
    border-radius: 5px;
    padding: 10px;
    color: white;
    background-color: #d9534f;
    border: none;
    svg {
        margin-bottom: -2px;
    }
`;

const ErrorLabel = styled.label`
    font-weight: 600;
    margin-left: 15px;
    margin-bottom: 0;
    margin-top: 15px;
    color: red;
    display: none;
`;

export const SC = {
    Container,
    QuantityInput,
    QuantityLabel,
    CartButton,
    WishListButton,
    ErrorLabel,
};
