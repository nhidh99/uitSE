import styled from "styled-components";
import { SS } from "../../share.styles";

const Table = styled.table`
    ${SS.AdminTable}

    td, th {
        &.select {
            border-right: 1px dashed #ddd;
        }
    }

    td {
        &.select,
        &.id,
        &.image,
        &.quantity,
        &.price {
            text-align: center;
        }

        &.select {
            width: 6%;
        }

        &.id,
        &.image,
        &.quantity,
        &.price {
            width: 15%;
        }

        &.name {
            width: 34%;
        }
    }
`;

export const SC = { Table };
