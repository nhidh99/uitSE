import React, { createElement } from "react";
import { FaDoorOpen } from "react-icons/fa";
import { removeCookie } from "../../services/helper/cookie";
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
            <li>
                <SC.NavItem
                    to=""
                    onClick={(e) => {
                        e.preventDefault();
                        if (window.confirm("Xác nhận đăng xuất?")) {
                            removeCookie("access_token");
                            window.location.href = "/";
                        }
                    }}
                >
                    <FaDoorOpen />
                    Đăng xuất
                </SC.NavItem>
            </li>
        </ul>
    </SC.Container>
);

export default MenuBar;
