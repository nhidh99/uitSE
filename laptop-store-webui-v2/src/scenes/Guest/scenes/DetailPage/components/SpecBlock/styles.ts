import styled from "styled-components";

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th {
        text-align: left;
        width: 20%;
    }
    th,
    td {
        padding: 10px 15px;
        border: 1px solid #f0f0f0;
    }
`;

export const SC = {
    Table,
};
