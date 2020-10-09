import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 20px;
`;

const LeftContainer = styled.div`
    flex: 5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
`;

const RightContainer = styled.div`
    flex: 2;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
`;

export const SC = {
    Container,
    LeftContainer,
    RightContainer,
};
