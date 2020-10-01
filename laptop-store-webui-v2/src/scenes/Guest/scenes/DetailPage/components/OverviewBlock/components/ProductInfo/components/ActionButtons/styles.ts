import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
`;

const QuantityLabel = styled.label`
    font-weight: bold;
    margin-right: 15px;
`;

const CartButton = styled.button`
    border-radius: 5px;
    padding: 10px;
    color: white;
    background-color: #5cb85c;
    border: none;
    margin-left: 15px;
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    cursor: ${(props) => (props.disabled ? "arrow" : "pointer")};
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
    margin-left: 15px;
    svg {
        margin-bottom: -2px;
    }
`;

export const SC = {
    Container,
    QuantityLabel,
    CartButton,
    WishListButton,
};
