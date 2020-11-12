import styled from "styled-components";
import LoadingContainerStyle from "../../../../../../values/styles/LoadingContainer.style";
import { SS } from "../../../../share.styles";

const Container = styled.div`
    ${LoadingContainerStyle}
    background-color: white;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
`;

const Table = styled.table`
    ${SS.AdminTable}
    box-shadow: none;

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

export const SC = { Container, Table };
