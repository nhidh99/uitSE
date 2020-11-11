import { css } from "styled-components";

export default css`
    &.loading {
        opacity: 0.6;
        pointer-events: none;
        cursor: default;
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
`;
