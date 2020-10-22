import styled from "styled-components";

const Button = styled.button`
    border-radius: 5px;
    padding: 10px;
    color: white;
    background-color: #5cb85c;
    border: none;
    margin-left: 15px;
    opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    cursor: ${(props) => (props.disabled ? "arrow" : "pointer")};
    svg {
        margin-bottom: -2px;
    }
`;

export const SC = {
    Button
};
