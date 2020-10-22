import styled from "styled-components";

const OuterContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const MilestoneContainer = styled.div`
    padding: 20px;
    display: flex;
    gap: 25px;
    border: 1px dashed #aaa;
    border-radius: 5px;
    align-items: center;
`;

const IconContainer = styled.div`
    font-size: 40px;
    svg {
        margin-bottom: -5px;
    }
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const TrophyContainer = styled.div`
    margin-left: auto;
`;

const Title = styled.div`
    color: #bf081f;
    font-weight: 600;
`;

export const SC = {
    OuterContainer,
    MilestoneContainer,
    IconContainer,
    InfoContainer,
    TrophyContainer,
    Title,
};
