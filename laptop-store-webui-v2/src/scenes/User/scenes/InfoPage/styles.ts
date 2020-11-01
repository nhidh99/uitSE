import styled from "styled-components";

const Submit = styled.input`
    border: none;
    background-color: #5cb85c;
    color: white;
    margin-top: 5px;
    margin-bottom: 0;
    margin-left: 110px;
    width: 200px;
    padding: 8px;
    cursor: pointer;

    :disabled {
        cursor: unset;
        opacity: 0.5;
    }
`;

export const SC = { Submit };
