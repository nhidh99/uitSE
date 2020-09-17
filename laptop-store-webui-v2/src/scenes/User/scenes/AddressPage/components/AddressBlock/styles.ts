import { FaEdit, FaTrash } from "react-icons/fa";
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
    svg {
        font-size: 16px;
        color: #888;
        cursor: pointer;
        border-radius: 5px;
        border: 1px solid #ccc;
        padding: 10px;

        :hover {
            background-color: #ccc;
        }
    }
`;

const EditButton = styled(FaEdit)`
    margin-right: 10px;
    :hover {
        color: #007bff;
    }
`;

const DeleteButton = styled(FaTrash)`
    :hover {
        color: #bf081f;
    }
`;

const DeliveryField = styled.span`
    font-weight: 600;
`;

export const SC = {
    BlockContainer,
    ButtonsContainer,
    InfoContainer,
    ReceiverName,
    DeliveryField,
    EditButton,
    DeleteButton,
};
