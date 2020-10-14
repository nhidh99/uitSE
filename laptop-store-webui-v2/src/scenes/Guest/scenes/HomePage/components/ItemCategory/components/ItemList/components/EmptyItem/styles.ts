import styled from "styled-components";
import ReactPlaceholder from "react-placeholder/lib";

const Container = styled.div`
    width: 25%;
    padding: 20px;
    height: fit-content;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
    font-size: 13px;
    background-color: white;
    box-sizing: border-box;

    :hover {
        box-shadow: 0 0 5px 5px #ddd;
    }

    :empty {
        border: 0;
    }
`;

const ImageHolder = styled(ReactPlaceholder)`
    height: 200px !important;
    display: block;
`;

export const SC = {
    Container,
    ImageHolder,
};
