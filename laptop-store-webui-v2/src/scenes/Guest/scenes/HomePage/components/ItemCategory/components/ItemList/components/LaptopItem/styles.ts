import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled(Link)`
    width: 20%;
    padding: 20px 0;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    background-color: white;
    font-size: 13px;
    box-sizing: border-box;
    cursor: pointer;

    * {
        cursor: pointer;
    }

    :hover {
        box-shadow: 0 0 5px 5px #ddd;
        img {
            transform: translateY(-12px);
            transition-duration: 0s;
        }
    }

    :empty {
        border: 0;
    }
`;

const ItemInfo = styled.div`
    margin: 0 15px;
`;

const ItemImage = styled.img`
    display: block;
    margin: 0 auto;
    padding: 10px;
`;

const ItemSpec = styled.div`
    color: #007bff;
    margin-bottom: 2px;
    font-size: 12px;
    color: #666;
    font-weight: 550;
`;

const ItemRating = styled.label`
    color: darkorange;
`;

const ItemName = styled.label`
    color: #333;
    margin-bottom: 2px;
    line-height: 1.2rem;
    display: inline-block;
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

export const SC = {
    Container,
    ItemInfo,
    ItemImage,
    ItemSpec,
    ItemRating,
    ItemName,
    UnitPrice,
    OriginPrice,
};
