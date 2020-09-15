import styled from "styled-components";

const Container = styled.div`
    display: flex;
    height: 100%;
    gap: 30px;
`;

const RightContainer = styled.div`
    width: 100%;
`;

const TitleContainer = styled.header`
    padding: 20px 0 0px 0px;
    font-size: 18px;
    margin-bottom: 10px;
    line-height: 1em;
    font-weight: bold;
`;

const ContentContainer = styled.div`
    background-color: white;
    padding: 30px;
`;

export const SC = {
    Container,
    RightContainer,
    TitleContainer,
    ContentContainer,
};
