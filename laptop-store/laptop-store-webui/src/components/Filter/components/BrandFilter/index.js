import React from "react";
import { Label } from "reactstrap";
import styles from "./styles.module.scss";

const BrandFilter = () => {
    const options = ["ACER", "ASUS", "DELL", "HP", "LENOVO", "MACBOOK", "MSI"];

    const toggleselected = (brand) => {
        const label = document.getElementById("brand-" + brand);
        if (label.hasAttribute("checked")) {
            label.style.border = "1px solid #ddd";
            label.removeAttribute("checked");
        } else {
            label.style.border = "5px solid #52a2e1";
            label.setAttribute("checked", "");
        }
    };

    return (
        <div className={styles.logosRow}>
            {options.map((brand) => (
                <Label
                    id={`brand-${brand}`}
                    onClick={() => toggleselected(brand)}
                    className={styles.logoLabel}
                    value={brand}
                >
                    <img
                        className={styles.logo}
                        src={require(`../../../../images/logos/${brand.toLowerCase()}.png`)}
                        alt="logo"
                    />
                </Label>
            ))}
        </div>
    );
};

export default BrandFilter;
