import styled from "styled-components";

const Section = styled.section`
    :not(:last-of-type) {
        margin-bottom: 30px;
    }
`;

const Header = styled.header`
    background-color: #f0f0f0;
    margin-bottom: 10px;
    font-size: 18px;
`;

export const SC = {
    Section,
    Header,
};
