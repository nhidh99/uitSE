import styled, { css } from "styled-components";

const flexColumn = css`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const Container = styled.div`
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 2fr 3fr;

    > div {
        border: 1px dashed #ccc;
        padding: 15px 20px;
        border-radius: 5px;
    }
`;

const Header = styled.header`
    color: #bf081f;
    font-weight: 600;
`;

const OrderInfo = styled.div`
    ${flexColumn}
    grid-column: 1;
`;

const DeliveryInfo = styled.div`
    ${flexColumn}
    grid-column: 2;
`;

const TrackContainer = styled.div`
    ${flexColumn}
    grid-column: 1 / 3;
`;

const ItemContainer = styled.div`
    ${Header} {
        margin-bottom: 15px;
    }
    grid-column: 1/3;
    padding-top: 15px !important;
    padding-bottom: 0 !important;
`;

const PaymentSummary = styled.div`
    float: right;
    font-weight: 500;
    color: #3b5998;
`;

const CancelButton = styled.button`
    float: right;
    width: 100px;
    border: none;
    margin: 0;
    background-color: #df4759;
    color: white;
    padding: 5px;
    border-radius: 2px;
    margin-bottom: -8px;
    :hover {
        cursor: pointer;
        text-decoration: underline;
    }
`;

export const SC = {
    Container,
    DeliveryInfo,
    OrderInfo,
    TrackContainer,
    Header,
    ItemContainer,
    PaymentSummary,
    CancelButton,
};
