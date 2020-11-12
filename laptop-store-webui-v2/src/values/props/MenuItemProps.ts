import { IconType } from "react-icons/lib";

type MenuItemProps = {
    icon: IconType;
    title: string;
    link: string;
    search?: object;
};

export default MenuItemProps;
