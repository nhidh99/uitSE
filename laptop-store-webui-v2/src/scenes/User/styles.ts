import styled from "styled-components";
import LoadingContainerStyle from "../../values/styles/LoadingContainer.style";

const Container = styled.div`
    display: flex;
    height: 100%;
    gap: 30px;
    margin: 30px 0;
`;

const LeftContainer = styled.div``;

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

    &.fetching {
        visibility: hidden;
    }

    ${LoadingContainerStyle}
`;

const LoaderContainer = styled.div`
    position: relative;
`;

export const SC = {
    Container,
    LeftContainer,
    RightContainer,
    TitleContainer,
    ContentContainer,
    LoaderContainer,
};
