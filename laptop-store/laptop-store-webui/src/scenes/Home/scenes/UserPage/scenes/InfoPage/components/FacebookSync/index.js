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
        }
    };

    const cancelSyncFacebook = async () => {
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
            confirm: () => cancelSyncFacebook,
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
