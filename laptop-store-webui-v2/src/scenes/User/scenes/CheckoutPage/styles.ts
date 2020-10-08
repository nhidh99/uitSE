import styled from "styled-components";

const Header = styled.div`
    font-size: 18px;
`;

const OuterContainer = styled.div`
    display: flex;
    margin: 30px 0;
    gap: 30px;
`;

const LeftContainer = styled.div`
    flex: 5;
`;

const RightContainer = styled.div`
    flex: 2;
`;

const SectionContainer = styled.section`
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
    margin-top: 15px;
`;

const ItemList = styled.div`
    background-color: white;
    display: flex;
    flex-direction: column;
    padding: 20px;
    gap: 20px;
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
`;

const TotalPrice = styled.div`
    color: #d9534f;
    font-weight: 600;
    font-size: 16px;
`;

const SubmitButton = styled.button`
    padding: 10px;
    color: white;
    background-color: #d9534f;
    font-size: 16px;
    border-radius: 5px;
    border: none;
    margin-top: -5px;
`;

export const SC = {
    Header,
    OuterContainer,
    LeftContainer,
    RightContainer,
    SectionContainer,
    ItemList,
    InfoRow,
    TotalPrice,
    SubmitButton,
};
