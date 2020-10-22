import styled from "styled-components";

const Header = styled.header`
    color: #454545;
    font-weight: bold;
    margin-bottom: 8px;
    font-size: 16px;
`;

const Container = styled.div`
    margin-left: 5px;
    display: flex;
    align-items: center;
    :not(:last-of-type) {
        margin-bottom: 10px;
    }
`;

const Image = styled.img`
    width: 35px;
    height: 35px;
    display: inline-block;
`;

const Label = styled.label`
    margin-left: 10px;
    display: inline-block;
`;

export const SC = {
    Header,
    Container,
    Image,
    Label,
};
