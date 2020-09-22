import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.nav`
    width: 250px;
    display: flex;
    flex-direction: column;
    margin: 0;
    border-right: 1px solid #ddd;

    ul {
        padding: 0;
        margin: 0;
    }
`;

const Setting = styled.div`
    color: #333;
    font-size: 18px;
    padding: 20px 0 0px 10px;
    margin-bottom: 10px;
    font-weight: 600;
    line-height: 1em;
`;

const NavItem = styled(Link)`
    display: block;
    color: #545454;
    padding: 15px 15px 15px 10px;
    background-color: ${(props) =>
        //@ts-ignore
        window.location.pathname.includes(props.to) ? "#ddd" : "transparent"};

    :hover {
        background-color: #ddd;
        color: #333;
    }

    svg {
        margin-bottom: -1px;
        margin-right: 8px;
    }
`;
export const SC = { Container, Setting, NavItem };
