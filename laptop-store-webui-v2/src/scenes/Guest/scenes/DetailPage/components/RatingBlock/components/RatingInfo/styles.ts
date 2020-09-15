import styled from "styled-components";

const Container = styled.div`
    flex: 1;
    padding: 20px 10px;
    border-right: 1px dashed #ddd;
    label {
        display: block;
        text-align: center;
        margin-bottom: 5px;
    }
`;

const RatingTitle = styled.label`
    font-weight: 600;
    font-size: 16px;
`;

const RatingAvg = styled.label`
    font-size: 24px;
    color: red;
    font-weight: 600;
`;

const RatingCount = styled.label`
    color: #007bff;
`;

const RatingInfo = styled.table`
    margin: 0 auto;
    border-spacing: 5px;
`;

const RatingStar = styled.span`
    color: #333;
    svg {
        margin-bottom: -1px;
    }
`;

export const SC = {
    Container,
    RatingTitle,
    RatingAvg,
    RatingCount,
    RatingInfo,
    RatingStar,
};
