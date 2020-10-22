import React from "react";
import { Collapse } from "reactstrap";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import FilterButton from "./components/FilterButton";
import FilterClear from "./components/FilterClear";
import FilterTable from "./components/FilterTable";

const Filter = () => {
    const isOpen = useSelector((state) => state.filter);
    return (
        <Collapse isOpen={isOpen} className={styles.collapse}>
            <div className={styles.container}>
                <FilterTable />
                <FilterButton />
                <FilterClear />
            </div>
        </Collapse>
    );
};

export default Filter;
