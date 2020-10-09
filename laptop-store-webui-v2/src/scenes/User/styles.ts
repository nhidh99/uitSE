import styled from "styled-components";

const Container = styled.div`
    display: flex;
    height: 100%;
    gap: 30px;
    margin-top: 30px;
`;

const LeftContainer = styled.div`
`;

const RightContainer = styled.div`
    width: 100%;
`;

const TitleContainer = styled.header`
    font-size: 18px;
    margin-bottom: 12px;
    line-height: 1em;
    font-weight: bold;
`;

const ContentContainer = styled.div`
    background-color: white;
    padding: 30px;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
`;

export const SC = {
    Container,
    LeftContainer,
    RightContainer,
    TitleContainer,
    ContentContainer,
};
