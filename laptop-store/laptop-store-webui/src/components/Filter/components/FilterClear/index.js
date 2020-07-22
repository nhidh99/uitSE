import React from "react";
import styles from "./styles.module.scss";

const FilterClear = () => {
    const clearSelections = () => {
        document.querySelectorAll("input[type=checkbox]").forEach((item) => (item.checked = false));
        document.querySelector("input[name='price']").checked = true;
        document.querySelectorAll("[id^='brand-']").forEach((label) => {
            label.style.border = "1px solid lightgray";
            label.removeAttribute("checked");
        });
    };

    return (
        <button className={styles.button} onClick={clearSelections}>
            Bỏ tất cả lựa chọn
        </button>
    );
};

export default FilterClear;
