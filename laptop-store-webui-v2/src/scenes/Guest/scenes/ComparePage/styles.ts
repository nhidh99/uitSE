import styled from "styled-components";

const Table = styled.table`
    background-color: white;
    border-width: 1px;
    border-spacing: 0px;
    border-collapse: separate;
    border-top: 1px solid #ddd;
    border-left: 1px solid #ddd;
    table-layout: fixed;
    width: 100%;

    td,
    th {
        text-align: left;
        border-bottom: 1px solid #ddd;
        border-right: 1px solid #ddd;
        padding: 10px;
    }

    th {
        width: 180px;
    }
`;

const SpecSection = styled.th`
    background-color: #ddd;
`;

const SummaryInfo = styled.td`
    padding: 0 !important;
    cursor: pointer;
    :hover {
        img {
            transform: translateY(-15px);
        }
    }

    a {
        display: block;
        padding: 20px;
        text-align: center;
    }
`;

const ProductName = styled.label`
    display: block;
    color: #007bff;
    font-size: 15px;
    margin-bottom: 5px;
`;

const ProductPrice = styled.span`
    color: #bf081f;
`;

const ProductRating = styled.span`
    color: darkorange;
`;

export const SC = {
    Table,
    SpecSection,
    SummaryInfo,
    ProductName,
    ProductPrice,
    ProductRating,
};
