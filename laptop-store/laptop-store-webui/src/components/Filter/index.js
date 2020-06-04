import React, { useState, useEffect } from "react";
import { Button, Collapse, Table, Label, Input } from "reactstrap";
import styles from "./styles.module.scss";
import store from "../../services/redux/store";

const Filter = (props) => {
    const brands = ["ACER", "ASUS", "DELL", "HP", "LENOVO", "MAC", "MSI"];

    const [isOpen, setIsOpen] = useState(false);
    const selectedBrands = [];

    useState(() => {
        store.subscribe(() => {
            const isOpen = store.getState()["filter"];
            setIsOpen(isOpen);
        });
    }, []);

    useEffect(() => {}, []);

    const toggleSelectedBrands = (brand) => {
        const index = selectedBrands.indexOf(brand);
        const label = document.getElementById("brand-" + brand);

        if (index === -1) {
            selectedBrands.push(brand);
            label.style.border = "5px solid #52a2e1";
        } else {
            selectedBrands.splice(index, 1);
            label.style.border = "1px solid lightgray";
        }
    };

    return (
        <Collapse isOpen={isOpen} className={styles.collapse}>
            <Table borderless className={styles.table}>
                <tr>
                    <td colSpan={4}>
                        <b>Nhãn hiệu</b>
                        <div className={styles.logosRow}>
                            {brands.map((brand) => (
                                <Label
                                    id={`brand-${brand}`}
                                    onClick={() => toggleSelectedBrands(brand)}
                                    className={styles.logoLabel}
                                >
                                    <img
                                        className={styles.logo}
                                        src={require(`../../images/logos/${brand.toLowerCase()}.png`)}
                                        alt="logo"
                                    />
                                </Label>
                            ))}
                        </div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <b>Mức giá</b> <br />
                        <Label>
                            <Input type="radio" className={styles.checkbox} name="price" /> Dưới
                            15 triệu
                        </Label>
                        <br />
                        <Label>
                            <Input type="radio" className={styles.checkbox} name="price" /> Từ 15
                            - 20 triệu
                        </Label>
                        <br />
                        <Label>
                            <Input type="radio" className={styles.checkbox} name="price" /> Từ 20
                            - 25 triệu
                        </Label>
                        <br />
                        <Label>
                            <Input type="radio" className={styles.checkbox} name="price" /> Trên
                            25 triệu
                        </Label>
                    </td>

                    <td>
                        <b>Nhu cầu</b> <br />
                        <Label>
                            <Input type="checkbox" className={styles.checkbox} name="price" /> Học
                            tập - Văn phòng
                        </Label>
                        <br />
                        <Label>
                            <Input type="checkbox" className={styles.checkbox} name="price" /> Đồ
                            họa - Kỹ thuật
                        </Label>
                        <br />
                        <Label>
                            <Input type="checkbox" className={styles.checkbox} name="price" />{" "}
                            Laptop Gaming
                        </Label>
                        <br />
                        <Label>
                            <Input type="checkbox" className={styles.checkbox} name="price" /> Cao
                            cấp sang trọng
                        </Label>
                        <br />
                        <Label>
                            <Input type="checkbox" className={styles.checkbox} name="price" /> Mỏng
                            nhẹ
                        </Label>
                    </td>

                    <td>
                        <b>CPU</b> <br />
                        <Label>
                            <Input type="checkbox" className={styles.checkbox} name="price" /> Intel
                            Core i7
                        </Label>
                        <br />
                        <Label>
                            <Input type="checkbox" className={styles.checkbox} name="price" /> Intel
                            Core i5
                        </Label>
                        <br />
                        <Label>
                            <Input type="checkbox" className={styles.checkbox} name="price" /> Intel
                            Core i3
                        </Label>
                        <br />
                        <Label>
                            <Input type="checkbox" className={styles.checkbox} name="price" /> Intel
                            Core Celeron/Pentium
                        </Label>
                        <br />
                        <Label>
                            <Input type="checkbox" className={styles.checkbox} name="price" /> AMD
                        </Label>
                    </td>

                    <td>
                        <b>RAM</b> <br />
                        <Label>
                            <Input type="checkbox" className={styles.checkbox} name="price" /> 16 GB
                        </Label>
                        <br />
                        <Label>
                            <Input type="checkbox" className={styles.checkbox} name="price" /> 8 GB
                        </Label>
                        <br />
                        <Label>
                            <Input type="checkbox" className={styles.checkbox} name="price" /> 4 GB
                        </Label>
                    </td>
                </tr>
            </Table>

            <Button color="secondary" className={styles.button}>
                Tìm kiếm
            </Button>
        </Collapse>
    );
};

export default Filter;
