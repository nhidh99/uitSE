/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { Button, Spinner } from "reactstrap";
import { withRouter } from "react-router-dom";
import Loader from "react-loader-advanced";
import { LOADING_DELAY } from "../../constants";

const EmptyBlock = (props) => {
    const { icon, loading, loadingText, emptyText, backToHome, borderless, noDelay } = props;
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShow(true);
        }, LOADING_DELAY);
    }, []);

    const backToHomePage = () => {
        window.scroll(0, 0);
        props.history.push("/");
    };

    return show || noDelay ? (
        <Loader
            show={loading}
            message=""
            backgroundStyle={{ backgroundColor: "transparent" }}
            className={styles.loader}
        >
            <div className={`${styles.block} ${borderless ? styles.borderless : ""}`}>
                {loading ? (
                    <Spinner
                        color="secondary"
                        style={{ width: "40px", height: "40px", marginBottom: "10px" }}
                    />
                ) : (
                    <span className={styles.icon}>{icon}</span>
                )}

                <label className={styles.title}>{loading ? loadingText : emptyText}</label>

                {backToHome ? (
                    <Button
                        className={styles.btn}
                        size="lg"
                        color="warning"
                        onClick={backToHomePage}
                    >
                        Quay lại trang mua sắm
                    </Button>
                ) : null}
            </div>
        </Loader>
    ) : null;
};

export default withRouter(EmptyBlock);
