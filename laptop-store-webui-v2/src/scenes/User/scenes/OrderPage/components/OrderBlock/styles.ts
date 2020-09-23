import styled from "styled-components";

const Container = styled.div`
    border: 1px dashed #bbb;
    border-radius: 5px;
    padding: 15px;
    flex: 0 50%;
    box-sizing: border-box;
    width: 100%;

    :not(:last-of-type) {
        margin-bottom: 15px;
    }
`;

const FlexContainer = styled.div`
    display: flex;
    gap: 15px;
`;

const InfoContainer = styled.div`
    :not(:last-of-type) {
        margin-bottom: 10px;
    }
`;

const OrderNo = styled.label`
    color: #bf081f;
    font-weight: 600;
    font-size: 16px;
`;

const FieldInfo = styled.span`
    font-weight: 600;
`;

const ViewButton = styled.div`
    float: right;
    color: #888;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
    border: 1px solid #ccc;

    svg {
        margin-bottom: -2px;
    }

    :hover {
        color: green;
        background-color: #ccc;
    }
`;

export const SC = {
    Container,
    InfoContainer,
    FlexContainer,
    OrderNo,
    FieldInfo,
    ViewButton,
};
