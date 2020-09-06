import styled from "styled-components";

const Header = styled.header`
    color: #454545;
    font-weight: bold;
    margin-bottom: 8px;
    font-size: 16px;
`;

const List = styled.ul`
    margin-bottom: 0;
`;

const ListItem = styled.li`
    :not(:last-of-type) {
        margin-bottom: 15px;
    }
`;

export const SC = {
    Header,
    List,
    ListItem,
};
