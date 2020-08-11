import React, { Fragment } from "react";
import { Label, Input } from "reactstrap";
import styles from "./styles.module.scss";

const PriceFilter = () => {
    const options = [
        "Tất cả mức giá",
        "Dưới 15 triệu",
        "Từ 15 - 20 triệu",
        "Từ 20 - 25 triệu",
        "Trên 25 triệu",
    ];

    return (
        <Fragment>
            <b>Mức giá</b>
            <br />
            {options.map((option, index) => {
                return (
                    <Fragment>
                        <Label>
                            <Input
                                type="radio"
                                className={styles.radio}
                                defaultChecked={index === 0}
                                name="price"
                                value={index}
                            />
                            {option}
                        </Label>
                        <br />
                    </Fragment>
                );
            })}
        </Fragment>
    );
};

export default PriceFilter;
