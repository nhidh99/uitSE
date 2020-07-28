import React from "react";
import { Collapse } from "reactstrap";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import FilterButton from "./components/FilterButton";
import FilterClear from "./components/FilterClear";
import FilterTable from "./components/FilterTable";

const Filter = (props) => {
    const isOpen = useSelector((state) => state.filter);
    const collapseStyle =
        props.location.pathname === "/search" ? styles.relativeCollapse : styles.absoluteCollapse;

    return (
        <Collapse isOpen={isOpen} className={collapseStyle}>
            <FilterTable />
            <FilterButton />
            <FilterClear />
        </Collapse>
    );
};

export default withRouter(Filter);
