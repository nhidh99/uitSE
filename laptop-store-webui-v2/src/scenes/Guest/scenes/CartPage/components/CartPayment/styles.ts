import styled from "styled-components";

const OuterContainer = styled.div`
    position: relative;
    background-color: white;
`;

const Container = styled.div`
    padding: 20px;
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
`;

const PaymentButton = styled.button`
    width: 100%;
    color: white;
    border-radius: 4px;
    border: none;
    background-color: #d9534f;
    padding: 12px;
    font-size: 16px;
    line-height: 1em;
    cursor: ${(props) => (props.disabled ? "arrow" : "pointer")};
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

export const SC = {
    OuterContainer,
    Container,
    InfoRow,
    PaymentButton,
};
