import styled from "styled-components";

const Container = styled.div`
    font-size: 14px;
    display: flex;
    gap: 20px;
    grid-column: 1 / 3;
    grid-row: 1;
    align-items: center;
    justify-content: center;
`;

const Line = styled.div`
    height: 3px;
    width: 80px;
    margin-bottom: 25px;

    &.active {
        background-color: #3b5998;
    }

    &.disabled {
        background-color: #ddd;
    }
`;

const Step = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: center;
    svg {
        margin-bottom: -5px;
    }
`;

const Icon = styled.div`
    width: 20px;
    height: 20px;
    text-align: center;
    border-radius: 50%;
    padding: 10px;

    &.active {
        border: none;
        background-color: #3b5998;
        color: white;
    }

    &.disabled {
        border: 1px solid #ddd;
        color: #666;
    }
`;

const Title = styled.div``;

export const SC = { Container, Line, Step, Icon, Title };
