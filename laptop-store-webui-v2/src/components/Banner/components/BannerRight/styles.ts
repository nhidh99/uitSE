import styled from "styled-components";

const NavBar = styled.nav`
    ul {
        display: inline-block;
        margin: 0;
    }

    li {
        padding: 10px;
        display: inline-block;
        color: white;
        text-align: center;
        cursor: pointer;

        :hover {
            background-color: #999;
        }
    }
`;

export const SC = {
    NavBar,
};
