import styled from "styled-components";

const BlockContainer = styled.div`
    border-radius: 5px;
    margin-top: 15px;
    border: 1px dashed #bbb;
    padding: 15px;
`;

const InfoContainer = styled.div`
    :not(:last-of-type) {
        margin-bottom: 5px;
    }
`;

const ReceiverName = styled.label`
    text-transform: uppercase;
    font-weight: 600;
    color: darkred;
`;

const ButtonsContainer = styled.div`
    float: right;
    display: flex;
    gap: 10px;
`;

const DeliveryField = styled.span`
    font-weight: 600;
`;

const DefaultAddress = styled.div`
    margin-bottom: 7px;
    font-weight: 600;
    color: #007bff;
    svg {
        margin-bottom: -1.5px;
        margin-right: 5px;
    }
`;

export const SC = {
    BlockContainer,
    ButtonsContainer,
    InfoContainer,
    ReceiverName,
    DeliveryField,
    DefaultAddress,
};
