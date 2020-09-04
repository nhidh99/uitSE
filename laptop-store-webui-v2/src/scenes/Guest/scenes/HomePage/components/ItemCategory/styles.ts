import styled from "styled-components";

const CategoryContainer = styled.div`
    :not(:last-of-type) {
        margin-bottom: 30px;
    }
`;

const CategoryHeader = styled.header`
    font-size: 18px;
    margin-bottom: 8px;
`;

const ItemContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    border-left: 1px solid #ddd;
    border-top: 1px solid #ddd;
`;

export const SC = {
    CategoryContainer,
    CategoryHeader,
    ItemContainer,
};
