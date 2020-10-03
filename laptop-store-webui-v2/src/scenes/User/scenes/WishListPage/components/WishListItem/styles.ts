import { FaTrash } from "react-icons/fa";
import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    padding: 0 20px 0 0;
    font-size: 13px;
    box-sizing: border-box;
    border: 1px dashed #ccc;
    text-decoration: none;

    :not(:last-of-type) {
        margin-bottom: 20px;
    }
`;

const InfoContainer = styled.div`
    display: flex;
    align-items: center;
`;

const ItemInfo = styled.div`
    display: inline-block;
    > div {
        margin-bottom: 6px;
    }
`;

const ItemImage = styled.img`
    width: 120px;
    height: 120px;
    user-select: none;
    padding: 10px 40px 10px 20px;
`;

const ItemSpec = styled.div`
    color: #007bff;
    margin-bottom: 2px;
    font-size: 12px;
    color: #666;
    font-weight: 600;
`;

const ItemRating = styled.span`
    color: darkorange;
`;

const ItemName = styled.div`
    font-size: 15px;
    color: #3b5998;
    font-weight: 600;
    margin-bottom: 5px;
`;

const UnitPrice = styled.label`
    color: #bf081f;
    font-weight: bold;
    margin-right: 10px;
`;

const OriginPrice = styled.label`
    text-decoration: line-through;
    font-size: 13px;
    color: #777;
`;

const Button = styled(FaTrash)`
    float: right;
    font-size: 16px;
    margin-top: 25px;
    padding: 10px;
    background-color: transparent;
    color:  #aaa;
    border-radius: 5px;
    border: 1px solid #ccc;
    cursor: pointer;

    svg {
        margin: 0;
    }
    
    :hover {
        background-color: #ddd;
        color: #bf081f;
    }
`;

export const SC = {
    Container,
    InfoContainer,
    ItemInfo,
    ItemImage,
    ItemSpec,
    ItemRating,
    ItemName,
    UnitPrice,
    OriginPrice,
    Button,
};
