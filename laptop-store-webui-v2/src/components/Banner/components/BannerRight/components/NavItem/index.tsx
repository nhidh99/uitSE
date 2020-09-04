import React, { createElement } from "react";
import { useHistory } from "react-router";
import { IconType } from "react-icons/lib";

type NavItemProps = {
    href: string;
    title: string;
    icon: IconType;
};

const NavItem = ({ href, title, icon }: NavItemProps) => {
    const history = useHistory();
    const iconElement = createElement(icon, { size: 20 });

    const redirect = () => {
        history.push(href);
        // store.dispatch(closeFilter());
    };

    return (
        <li onClick={redirect}>
            {iconElement}
            <br />
            {title}
        </li>
    );
};

export default NavItem;
