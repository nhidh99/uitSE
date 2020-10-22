import React from "react";
import Spinner from "../Spinner";
import { SC } from "./styles";

type LoaderProps = {
    loading: boolean;
    loadOnce?: boolean;
};

const Loader = ({ loading, loadOnce }: LoaderProps) =>
    loading ? (
        loadOnce ? (
            <SC.SpinnerContainer>
                <Spinner />
                <br />
                Đang tải thông tin
            </SC.SpinnerContainer>
        ) : (
            <SC.Loader>
                <Spinner />
            </SC.Loader>
        )
    ) : null;

export default Loader;
