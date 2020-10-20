import styled from "styled-components";

const OuterContainer = styled.div`
    :not(:last-of-type) {
        margin-bottom: 30px;
    }
`;
const Header = styled.header`
    font-size: 18px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
`;

const ItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
    background-color: white;
    margin-right: -1px;
    margin-bottom: -1px;
`;

export const SC = {
    OuterContainer,
    Header,
    ItemContainer,
};
