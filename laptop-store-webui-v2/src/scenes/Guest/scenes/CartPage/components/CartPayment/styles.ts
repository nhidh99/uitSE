import styled from "styled-components";

const OuterContainer = styled.div`
    position: relative;
    background-color: white;
    border: 1px dashed #ddd;
`;

const Container = styled.div`
    font-size: 16px;
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
    cursor: pointer;
    padding: 12px;
    font-size: 16px;
    line-height: 1em;
    font-weight: 600;
`;

export const SC = {
    OuterContainer,
    Container,
    InfoRow,
    PaymentButton,
};
