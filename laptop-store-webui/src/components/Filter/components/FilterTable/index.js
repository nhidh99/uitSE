import React from "react";
import styles from "./styles.module.scss";
import PriceFilter from "../PriceFilter";
import TagFilter from "../TagFilter";
import CPUFilter from "../CPUFilter";
import RAMFilter from "../RAMFilter";
import { Table } from "reactstrap";
import BrandFilter from "../BrandFilter";

const FilterTable = () => {
    const filters = [<PriceFilter />, <TagFilter />, <CPUFilter />, <RAMFilter />];
    return (
        <Table borderless className={styles.table}>
            <tr>
                <td colSpan={4}>
                    <BrandFilter />
                </td>
            </tr>
            <tr>
                {filters.map((filter) => (
                    <td>{filter}</td>
                ))}
            </tr>
        </Table>
    );
};

export default FilterTable;
