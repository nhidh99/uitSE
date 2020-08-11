import React, { Fragment } from "react";
import { Label } from "reactstrap";
import styles from "./styles.module.scss";
import {
    convertCPUType,
    convertResolutionType,
} from "../../../../../../../../../../services/helper/converter";
import { useSelector } from "react-redux";

const SpecInfo = () => {
    const product = useSelector((state) => state.productDetail.product);
    const { cpu, ram, hard_drive, monitor } = product;

    return (
        <Fragment>
            <Label className={styles.label}>Thông số cơ bản</Label>
            <br />
            <ul className={styles.block}>
                <li>
                    <label className={styles.item}>
                        <b>CPU:</b>{" "}
                        {`${convertCPUType(cpu["type"])} ${cpu["detail"]}, ${cpu["speed"]} GHz`}
                    </label>
                </li>
                <li>
                    <label className={styles.item}>
                        <b>RAM:</b> {`${ram["size"]} GB ${ram["type"]} ${ram["bus"]} MHz`}
                    </label>
                </li>
                <li>
                    <label className={styles.item}>
                        <b>Ổ cứng: </b>
                        {`${hard_drive["type"]} 
                            ${hard_drive["size"] === 1024 ? "1 TB" : `${hard_drive["size"]} GB`} 
                            ${hard_drive["detail"]}`}
                    </label>
                </li>
                <li>
                    <label className={styles.item}>
                        <b>Màn hình: </b>
                        {`${monitor["size"]} inch,
                ${convertResolutionType(monitor["resolution_type"])} 
                (${monitor["resolution_width"]} x ${monitor["resolution_height"]})`}
                    </label>
                </li>
            </ul>
        </Fragment>
    );
};

export default SpecInfo;
