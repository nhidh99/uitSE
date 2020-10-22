import styled from "styled-components";
import ReactPlaceholder from "react-placeholder/lib";

const TextHolder = styled(ReactPlaceholder)`
    margin-bottom: 15px;
    width: 50% !important;
    height: 25px !important;
`;

const RectHolder = styled(ReactPlaceholder)`
    height: 400px !important;

    :not(last-:last-of-type) {
        margin-bottom: 30px;
    }
`;

export const SC = {
    TextHolder,
    RectHolder,
};
