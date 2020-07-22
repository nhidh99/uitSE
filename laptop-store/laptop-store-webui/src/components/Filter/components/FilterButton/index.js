import React from "react";
import styles from "./styles.module.scss";
import store from "../../../../services/redux/store";
import { closeFilter } from "../../../../services/redux/actions";
import { withRouter } from "react-router-dom";

const FilterButton = (props) => {
    const buildURLSearchParams = () => {
        const params = new URLSearchParams();

        const selectedPrice = document.querySelector("input[name='price']:checked").value;

        const selectedTags = [].map.call(
            document.querySelectorAll("input[name='tags']:checked"),
            (input) => input.value
        );

        const selectedCPUs = [].map.call(
            document.querySelectorAll("input[name='cpus']:checked"),
            (input) => input.value
        );

        const selectedRAMs = [].map.call(
            document.querySelectorAll("input[name='rams']:checked"),
            (input) => input.value
        );

        const selectedBrands = [].map.call(
            document.querySelectorAll("[id^='brand-'][checked]"),
            (input) => input.getAttribute("value")
        );

        if (parseInt(selectedPrice) !== 0) params.append("price", selectedPrice);
        selectedBrands.forEach((brand) => params.append("brands", brand));
        selectedTags.forEach((tag) => params.append("tags", tag));
        selectedRAMs.forEach((ram) => params.append("rams", ram));
        selectedCPUs.forEach((cpu) => {
            if (cpu === "CELERON_PENTIUM") {
                params.append("cpus", "INTEL_CELERON");
                params.append("cpus", "INTEL_PENTIUM");
            } else {
                params.append("cpus", cpu);
            }
        });
        return params;
    };

    const submit = async () => {
        store.dispatch(closeFilter());
        const params = buildURLSearchParams();
        const url = `/search?${params.toString()}`;
        props.history.push(url);
    };

    return (
        <button className={styles.button} onClick={submit}>
            Tìm kiếm
        </button>
    );
};

export default withRouter(FilterButton);
