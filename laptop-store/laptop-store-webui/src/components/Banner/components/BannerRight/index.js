import React, { Fragment } from "react";
import styles from "./styles.module.scss";
import { Label, Badge } from "reactstrap";
import store from "../../../../services/redux/store";
import { closeFilter, toggleFilter } from "../../../../services/redux/actions";
import { withRouter } from "react-router-dom";
import { FaSearch, FaEdit, FaBoxes, FaShoppingCart, FaUser } from "react-icons/fa";
import { ROLE_ADMIN, ROLE_USER, ROLE_GUEST } from "../../../../constants";
import { getCart } from "../../../../services/helper/cart";

const BannerRight = (props) => {
    const CartIcon = () => (
        <Fragment>
            <FaShoppingCart />
            &nbsp;
            <Badge pill id="cart-quantity" className={styles.cartCount}>
                {Object.values(getCart()).reduce((a, b) => a + b, 0)}
            </Badge>
        </Fragment>
    );

    const BannerCategory = ({ href, icon, title }) => {
        const redirect = () => {
            props.history.push(href);
            store.dispatch(closeFilter());
        };

        return (
            <span className={styles.bannerCategory} onClick={redirect}>
                <td className={styles.category}>
                    <div className={styles.icon}>{icon}</div>
                    <Label className={styles.label}>{title}</Label>
                </td>
            </span>
        );
    };

    const BannerCategories = () => {
        const categoryItems = [
            {
                href: "/admin/orders",
                icon: <FaEdit />,
                title: "Quản lí",
                roles: [ROLE_ADMIN],
            },
            {
                href: "/user/order",
                icon: <FaBoxes />,
                title: "Đơn hàng",
                roles: [ROLE_USER, ROLE_ADMIN],
            },
            {
                href: "/cart",
                icon: <CartIcon />,
                title: "Giỏ hàng",
                roles: [ROLE_GUEST, ROLE_USER, ROLE_ADMIN],
            },
            {
                href: "/auth/login",
                icon: <FaUser />,
                title: "Đăng nhập",
                roles: [ROLE_GUEST],
            },
            {
                href: "/user/info",
                icon: <FaUser />,
                title: "Tài khoản",
                roles: [ROLE_USER, ROLE_ADMIN],
            },
        ];

        return categoryItems.map((item) =>
            item.roles.includes(props.role) ? (
                <BannerCategory href={item.href} icon={item.icon} title={item.title} />
            ) : null
        );
    };

    const FilterCategory = () => {
        const toggle = () => store.dispatch(toggleFilter());
        return (
            <span className={styles.bannerCategory} onClick={toggle}>
                <td className={styles.category}>
                    <div className={styles.icon}>
                        <FaSearch />
                    </div>
                    <Label className={styles.label}>Tìm kiếm</Label>
                </td>
            </span>
        );
    };

    return (
        <div className={styles.bannerRight}>
            <FilterCategory />
            <BannerCategories />
        </div>
    );
};

export default withRouter(BannerRight);
