import styled from "styled-components";

const Container = styled.div`
`;

const Header = styled.header`
    font-size: 18px;
    margin-bottom: 10px;
    font-weight: 600;
`;

const Info = styled.label`
    display: block;
    :not(:last-of-type) {
        margin-bottom: 10px;
    }
`;

export const SC = {
    Container,
    Info,
    Header,
};
