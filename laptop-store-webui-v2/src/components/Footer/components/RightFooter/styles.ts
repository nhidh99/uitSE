import styled from "styled-components";

const Container = styled.div``;

const Header = styled.header`
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
`;

const IconContainer = styled.div`
    svg {
        font-size: 30px;
        :not(:last-of-type) {
            margin-right: 15px;
        }
    }
`;

export const SC = {
    Container,
    Header,
    IconContainer,
};
