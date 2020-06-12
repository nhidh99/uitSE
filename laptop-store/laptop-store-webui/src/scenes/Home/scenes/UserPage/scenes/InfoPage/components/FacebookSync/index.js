import React, { useState, useEffect } from "react";
import { getCookie } from "../../../../../../../../services/helper/cookie";
import { buildModal } from "../../../../../../../../services/redux/actions";
import store from "../../../../../../../../services/redux/store";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { Button } from "reactstrap";
import { FaFacebookF } from "react-icons/fa";
import styles from "./styles.module.scss";

const FacebookSync = (props) => {
    const [fbAuth, setFbAuth] = useState(props.auth);

    useEffect(() => {
        setFbAuth(props.auth);
    }, [props.auth]);

    const responseFacebook = async (res) => {
        const facebookId = res["id"];
        const isExistedSync = await checkFacebookSync(facebookId);

        if (isExistedSync === null) {
            const modal = {
                title: "Lỗi hệ thống",
                message: "Không thể xử lí yêu cầu",
                confirm: null,
            };
            store.dispatch(buildModal(modal));
            return;
        }

        if (isExistedSync === true) {
            const modal = {
                title: "Đã tồn tại liên kết",
                message: "Tài khoản Facebook đã được liên kết với người dùng khác",
                confirm: null,
            };
            store.dispatch(buildModal(modal));
            return;
        }

        syncFacebook(facebookId);
    };

    const checkFacebookSync = async (facebookId) => {
        const response = await fetch("/cxf/api/auth/facebook", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
            body: JSON.stringify({ id: facebookId }),
        });
        return response.ok ? await response.json() : null;
    };

    const syncFacebook = async (facebookId) => {
        const response = await fetch("/cxf/api/auth/facebook/sync", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
            body: JSON.stringify({ id: facebookId }),
        });

        if (response.ok) {
            setFbAuth(true);
        } else {
            const modal = {
                title: "Lỗi hệ thống",
                message: "Không thể xử lí yêu cầu",
                confirm: null,
            };
            store.dispatch(buildModal(modal));
        }
    };

    const cancelFacebookSync = async () => {
        const response = await fetch("/cxf/api/auth/facebook/sync", {
            method: "DELETE",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });
        if (response.ok) {
            setFbAuth(false);
        }
    };

    const showCancelSyncModal = () => {
        const modal = {
            title: "Hủy liên kết Facebook",
            message: "Xác nhận hủy liên kết tài khoản Facebook?",
            confirm: () => cancelFacebookSync,
        };
        store.dispatch(buildModal(modal));
    };

    return fbAuth === null ? null : (
        <FacebookLogin
            appId={1961661687297528}
            fields="name"
            callback={responseFacebook}
            render={(renderProps) => (
                <Button
                    type="submit"
                    className={styles.button}
                    color="primary"
                    onClick={fbAuth ? showCancelSyncModal : renderProps.onClick}
                >
                    <FaFacebookF className={styles.icon} />{" "}
                    {fbAuth ? "Hủy kết nối Facebook" : "Kết nối Facebook"}
                </Button>
            )}
        />
    );
};

export default FacebookSync;
