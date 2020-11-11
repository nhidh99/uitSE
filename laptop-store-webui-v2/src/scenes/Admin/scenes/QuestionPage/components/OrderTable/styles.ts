import styled from "styled-components";
import { SS } from "../../../../share.styles";

const Table = styled.table`
    ${SS.AdminTable}

    td {
        &.id,
        &.date,
        &.name,
        &.phone,
        &.price {
            text-align: center;
        }

        &.id,
        &.date,
        &.phone {
            width: 10%;
        }

        &.name {
            width: 20%;
        }

        &.location {
            width: 40%;
        }

        &.price {
            width: 10%;
        }
    }
`;

export const SC = { Table };
