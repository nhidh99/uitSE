import styled from "styled-components";

const Button = styled.button`
    width: 100%;
    color: #777;
    background-color: white;
    border-top: none;
    border-left: none;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    padding: 10px 0;
    font-size: 16px;
    cursor: ${(props) => (props.disabled ? "arrow" : "pointer")};

    :hover {
        color: white;
        background-color: #aaa;
    }

    :focus {
        outline: 0;
    }
`;

export const SC = {
    Button,
};
