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
    th:nth-child(6) {
        text-align: left;
    }

    td {
        line-height: 1.5em;

        &.id,
        &.point,
        &.date {
            text-align: center;
        }

        &.id {
            width: 10%;
        }

        &.name {
            width: 15%;
        }

        &.date {
            width: 15%;
        }

        &.product-name {
            width: 25%;
        }

        &.point {
            width: 5%;
        }

        &.rating {
            width: 30%;
            div {
                ${EllipsisContainerStyle}
            }
        }
    }
`;

export const SC = { Container, Table };
