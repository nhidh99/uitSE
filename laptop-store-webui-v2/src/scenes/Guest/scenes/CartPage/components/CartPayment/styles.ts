import styled from "styled-components";
import LoadingContainerStyle from "../../../../../../values/styles/LoadingContainer.style";

const OuterContainer = styled.div`
    position: relative;
    background-color: white;
    ${LoadingContainerStyle}
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
    cursor: pointer;
`;

export const SC = {
    OuterContainer,
    Container,
    InfoRow,
    PaymentButton,
};
