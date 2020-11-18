import styled from "styled-components";
import EllipsisContainerStyle from "../../../../../../values/styles/EllipsisContainer.style";
import LoadingContainerStyle from "../../../../../../values/styles/LoadingContainer.style";
import { SS } from "../../../../share.styles";

const Container = styled.div`
    ${LoadingContainerStyle}
    background-color: white;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
`;

const Table = styled.table`
    ${SS.AdminTable}

    th:nth-child(3),
    th:nth-child(4),
    th:nth-child(5) {
        text-align: left;
    }

    td {
        &.id,
        &.date,
        &.image {
            text-align: center;
        }

        &.id {
            width: 10%;
        }

        &.date {
            width: 15%;
        }

        &.product-name {
            width: 30%;
        }

        &.question {
            width: 30%;

            div {
                ${EllipsisContainerStyle}
            }
        }

        &.name {
            width: 15%;
        }
    }
`;

export const SC = { Container, Table };
