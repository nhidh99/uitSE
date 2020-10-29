import styled from "styled-components";
import { SS } from "../../share.styles";

const Table = styled.table`
    ${SS.AdminTable}

    td {
        &.select,
        &.id,
        &.image,
        &.quantity,
        &.unit_price,
        &.rating {
            text-align: center;
        }
    }

    th,
    td {
        &.select {
            width: 6%;
        }

        &.id,
        &.image,
        &.quantity,
        &.rating {
            width: 10%;
        }

        &.name {
            width: 39%;
        }

        &.unit_price {
            width: 15%;
        }
    }
`;

export const SC = { Table };
