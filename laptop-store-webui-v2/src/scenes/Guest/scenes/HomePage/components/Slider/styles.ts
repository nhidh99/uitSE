import styled from "styled-components";

const Container = styled.div`
    margin-bottom: 25px;
    *:focus {
        outline: 0;
    }
    button {
        padding: 40px 10px;
    }
    svg {
        height: unset !important;
        width: 30px !important;
    }
`;

export const SC = { Container };
