import React, { createElement, memo, useCallback } from "react";
import { useHistory } from "react-router";
import { IconType } from "react-icons/lib";
import store from "../../../../../../services/redux/store";
import RoleConstants from "../../../../../../values/constants/RoleConstants";

type NavItemProps = {
    href: string;
    title: string;
    icon: IconType;
    allowedRoles: Array<string>;
};

const NavItem = ({ href, title, icon, allowedRoles }: NavItemProps) => {
    const history = useHistory();
    const iconElement = createElement(icon, { size: 20 });
    const role = store.getState().user?.role ?? RoleConstants.GUEST;

    const redirect = useCallback(() => {
        history.push(href);
    }, [history, href]);

    return allowedRoles.includes(role) ? (
        <li onClick={redirect}>
            {iconElement}
            <br />
            {title}
        </li>
    ) : null;
};

export default memo(NavItem);
