import React, { Fragment } from "react";
import { Label, Input } from "reactstrap";
import styles from "./styles.module.scss";

const CheckboxesFilter = ({ title, type, options }) => {
    return (
        <Fragment>
            <b>{title}</b>
            <br />
            {options.map((option) => (
                <Fragment>
                    <Label>
                        <Input
                            type="checkbox"
                            name={type}
                            value={option.value}
                            className={styles.checkbox}
                        />
                        {option.name}
                    </Label>
                    <br />
                </Fragment>
            ))}
        </Fragment>
    );
};

export default CheckboxesFilter;
