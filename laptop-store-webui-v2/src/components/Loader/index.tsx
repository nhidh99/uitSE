import React from "react";
import Spinner from "../Spinner";
import { SC } from "./styles";

type LoaderProps = {
    loading: boolean;
};

const Loader = ({ loading }: LoaderProps) =>
    loading ? (
        <SC.Loader>
            <Spinner />
        </SC.Loader>
    ) : null;

export default Loader;
