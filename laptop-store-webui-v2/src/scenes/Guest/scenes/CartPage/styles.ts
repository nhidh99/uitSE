import styled from "styled-components";

const Header = styled.header`
    font-size: 18px;
    margin-bottom: 10px;
`;

const Container = styled.div`
    display: flex;
    gap: 20px;
`;

const LeftContainer = styled.div`
    flex: 5;
`;

const RightContainer = styled.div`
    flex: 2;
`;

export const SC = {
    Header,
    Container,
    LeftContainer,
    RightContainer,
};
