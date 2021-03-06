import React, { Fragment } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import {
    FaBook,
    FaMapMarkerAlt,
    FaUser,
    FaBoxes,
    FaInfoCircle,
    FaLock,
    FaDoorOpen,
    FaHeart,
    FaTrophy,
} from "react-icons/fa";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { removeCookie } from "../../../../../../services/helper/cookie";

const SideBar = () => {
    const logout = () => {
        removeCookie("access_token");
        localStorage.setItem("cart", null);
        localStorage.setItem("wish-list", null);
        window.location.href = "/";
    };

    return (
        <Fragment>
            <ListGroup className={styles.listGroup}>
                <ListGroupItem color="secondary">
                    <FaUser className={styles.icon} />
                    <b>Tài khoản</b>
                </ListGroupItem>

                <Link to="/user/info" className={styles.link}>
                    <ListGroupItem>
                        <FaInfoCircle className={styles.icon} />
                        Thông tin
                    </ListGroupItem>
                </Link>

                <Link to="/user/address" className={styles.link}>
                    <ListGroupItem>
                        <FaMapMarkerAlt className={styles.icon} />
                        Sổ địa chỉ
                    </ListGroupItem>
                </Link>

                <Link to="/user/password" className={styles.link}>
                    <ListGroupItem>
                        <FaLock className={styles.icon} />
                        Đổi mật khẩu
                    </ListGroupItem>
                </Link>

                <Link className={styles.link}>
                    <ListGroupItem onClick={logout}>
                        <FaDoorOpen className={styles.icon} />
                        Đăng xuất
                    </ListGroupItem>
                </Link>
            </ListGroup>

            <br />

            <ListGroup className={styles.listGroup}>
                <ListGroupItem color="secondary">
                    <FaBook className={styles.icon} />
                    <b>Danh mục</b>
                </ListGroupItem>

                <Link to="/user/order" className={styles.link}>
                    <ListGroupItem>
                        <FaBoxes className={styles.icon} />
                        Đơn hàng
                    </ListGroupItem>
                </Link>

                <Link to="/user/wish-list" className={styles.link}>
                    <ListGroupItem>
                        <FaHeart className={styles.icon} />
                        Xem sau
                    </ListGroupItem>
                </Link>

                <Link to="/user/reward" className={styles.link}>
                    <ListGroupItem>
                        <FaTrophy className={styles.icon} />
                        Cột mốc
                    </ListGroupItem>
                </Link>
            </ListGroup>
        </Fragment>
    );
};

export default SideBar;
