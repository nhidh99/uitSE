import styled from "styled-components";

const NavBar = styled.nav`
    ul {
        display: flex;
        margin: 0;
        list-style-type: none;
    }

    li {
        padding: 10px;
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
