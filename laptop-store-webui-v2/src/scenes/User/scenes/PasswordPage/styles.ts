import styled from "styled-components";

const SubmitButton = styled.button`
    border: none;
    background-color: #ffcc00;
    color: #333;
    margin-top: 5px;
    margin-left: 110px;
    width: 200px;
    padding: 10px;
    cursor: pointer;

    :disabled {
        opacity: 0.5;
        cursor: unset;
    }
`;

export const SC = { SubmitButton };
