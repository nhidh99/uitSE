import React, { useState } from "react";
import { Collapse } from "reactstrap";
import styles from "./styles.module.scss";
import store from "../../services/redux/store";
import { withRouter } from "react-router-dom";
import FilterButton from "./components/FilterButton";
import FilterClear from "./components/FilterClear";
import FilterTable from "./components/FilterTable";

const Filter = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const collapseStyle =
        props.location.pathname === "/search" ? styles.relativeCollapse : styles.absoluteCollapse;

    useState(() => {
        store.subscribe(() => {
            const isOpen = store.getState()["filter"];
            setIsOpen(isOpen);
        });
    }, []);

    return (
        <Collapse isOpen={isOpen} className={collapseStyle}>
            <FilterTable />
            <FilterButton />
            <FilterClear />
        </Collapse>
    );
};

export default withRouter(Filter);