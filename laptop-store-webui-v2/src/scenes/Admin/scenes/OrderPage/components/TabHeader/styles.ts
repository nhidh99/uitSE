import styled from "styled-components";

const Container = styled.div`
    display: flex;
    margin-right: -1px;
`;

const Button = styled.button`
    background-color: transparent;
    flex: 1;
    border: none;
    border-bottom: 1px solid #ddd;
    padding: 15px 0;
    font-size: 16px;
    color: #666;
    cursor: pointer;

    svg {
        margin-bottom: -3px;
        margin-right: 7px;
    }

    :hover {
        background-color: #e5e5e5;
    }

    &.active {
        border-bottom: 3px solid #3895d3;
        color: #3895d3;
    }
`;

export const SC = { Container, Button };
