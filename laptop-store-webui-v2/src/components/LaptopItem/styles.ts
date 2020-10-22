import styled from "styled-components";
import { Link } from "react-router-dom";

const ItemInfo = styled.div`
    margin: 0 15px;
`;

const ItemImage = styled.img`
    display: block;
    margin: 0 auto;
    padding: 10px;
`;

const ItemSpec = styled.label`
    color: #007bff;
    margin-bottom: 2px;
    font-size: 12px;
    color: #666;
    font-weight: 550;
    display: inline-block;
`;

const ItemRating = styled.span`
    color: darkorange;
`;

const ItemName = styled.label`
    color: #333;
    margin-bottom: 2px;
    line-height: 1.2rem;
    display: inline-block;
`;

const Container = styled(Link)`
    max-width: 25%;
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    background-color: white;
    font-size: 14px;
    box-sizing: border-box;
    text-decoration: none;
    cursor: pointer;

    * {
        cursor: pointer;
    }

    :hover {
        img {
            transform: translateY(-12px);
            transition-duration: 0s;
        }
        ${ItemName} {
            color: #288ad6;
        }
    }

    :empty {
        border: 0;
    }
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

const Compare = styled(Link)`
    display: block;
    margin-top: 5px;
    color: #007bff;
    :hover {
        text-decoration: underline;
    }
`;

export const SC = {
    Container,
    ItemInfo,
    ItemImage,
    ItemSpec,
    ItemRating,
    ItemName,
    UnitPrice,
    OriginPrice,
    Compare,
};
