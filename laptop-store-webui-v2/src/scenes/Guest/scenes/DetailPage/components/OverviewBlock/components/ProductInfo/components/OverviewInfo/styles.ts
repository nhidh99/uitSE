import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const NameContainer = styled.div`
    margin-bottom: 10px;
`;

const PriceContainer = styled.div``;

const NameLabel = styled.label`
    font-size: 18px;
    margin-right: 10px;
    font-weight: 600;
`;

const UnitPrice = styled.label`
    color: #bf081f;
    font-size: 18px;
    font-weight: bold;
`;

const OriginPrice = styled.label`
    margin-left: 5px;
    text-decoration: line-through;
`;

const DiscountPrice = styled.label`
    margin-left: 5px;
    font-style: italic;
`;

const RatingStar = styled(FaStar)`
    font-size: 16px;
    margin-bottom: -1px;
    margin-right: 5px;
`;

export const SC = {
    NameContainer,
    PriceContainer,
    NameLabel,
    UnitPrice,
    OriginPrice,
    DiscountPrice,
    RatingStar,
};
