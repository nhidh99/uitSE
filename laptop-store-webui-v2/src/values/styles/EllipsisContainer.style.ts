import { css } from "styled-components";

export default css`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-height: 1.5em;
    max-height: 3em;
    width: 100%;
`;
