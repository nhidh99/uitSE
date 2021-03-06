import styled from "styled-components";

const Container = styled.div`
    padding: 20px;

    .thumbnail {
        width: 80px !important;
        transition: none !important;
        margin-top: 10px;

        img {
            width: 50px !important;
            height: 50px !important;
        }
    }

    .thumbnail[aria-pressed="false"] {
        border: 1px solid #ddd !important;
    }

    .thumbnail:not(:last-of-type) {
        margin-right: 5px;
    }
`;

export const SC = {
    Container,
};
