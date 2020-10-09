import styled from "styled-components";

const Container = styled.div`
    padding: 12px 20px;
    /* background-image: linear-gradient(90deg, #ccc, #d3d3d3); */
    background-image: linear-gradient(90deg, #ddd, #ebebeb);
    color: #444;
    display: flex;
    justify-content: space-between;

    svg {
        margin-bottom: -2px;
        margin-right: 8px;
    }
`;

const LeftContainer = styled.div``;

const RightContainer = styled.div``;

export const SC = {
    Container,
    LeftContainer,
    RightContainer,
};
