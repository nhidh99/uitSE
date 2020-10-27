import React, { createElement } from "react";
import MenuItemProps from "../../values/props/MenuItemProps";
import { SC } from "./styles";

type MenuBarProps = {
    items: MenuItemProps[];
};

const MenuBar = ({ items }: MenuBarProps) => (
    <SC.Container>
        <SC.Setting>Bảng điều khiển</SC.Setting>
        <ul>
            {items.map((item) => (
                <li>
                    <SC.NavItem to={{ pathname: item.link, search: item?.search ?? "" }}>
                        {createElement(item.icon)}
                        {item.title}
                    </SC.NavItem>
                </li>
            ))}
        </ul>
    </SC.Container>
);

export default MenuBar;
