import styled from "styled-components";
import { SS } from "../../../../share.styles";

const Container = styled.div`
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
`;

const Table = styled.table`
    ${SS.AdminTable}
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

export const SC = { Container, Table };
