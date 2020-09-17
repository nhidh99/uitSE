import styled from "styled-components";

const AddButton = styled.button`
    width: 100%;
    border-radius: 5px;
    padding: 15px;
    border: 1px dashed #5cb85c;
    color: #5cb85c;
    background-color: white;
    cursor: pointer;

    svg {
        margin-bottom: -3px;
        margin-right: 6px;
        font-size: 16px;
    }
`;

export const SC = { AddButton };
