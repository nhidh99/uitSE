import { IconType } from "react-icons/lib";

type MenuItemProps = {
    icon: IconType;
    title: string;
    link: string;
    search?: string;
};

export default MenuItemProps;
