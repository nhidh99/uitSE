import styled from "styled-components";

const Container = styled.div`
    display: flex;
    align-items: center;
    padding: 10px 20px;
    border: 1px dashed #ccc;
`;

const ItemName = styled.div`
    font-size: 15px;
    color: #3b5998;
    font-weight: 600;
    margin-bottom: 5px;
`;

const LaptopImage = styled.img`
    width: 60px;
    height: 60px;
    margin-right: 30px;
    user-select: none;
`;

const PromotionImage = styled.img`
    width: 40px;
    height: 40px;
    margin: 10px 40px 10px 10px;
    user-select: none;
`;

const ItemPrice = styled.span`
    font-weight: 600;
`;

const TotalPrice = styled.span`
    font-weight: 600;
    color: #bf081f;
`;

export const SC = {
    Container,
    LaptopImage,
    PromotionImage,
    ItemName,
    ItemPrice,
    TotalPrice,
};
