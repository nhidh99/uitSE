import React from "react";
import { FaBox, FaCheck, FaClipboardCheck, FaSync, FaTruck } from "react-icons/fa";
import { useStore } from "react-redux";
import { RootState } from "../../../../../../services/redux/rootReducer";
import { SC } from "./styles";

const ProgressBar = () => {
    const store = useStore<RootState>();
    const steps = [
        {
            icon: <FaSync />,
            title: "Chờ duyệt",
        },
        {
            icon: <FaClipboardCheck />,
            title: "Xác nhận",
        },
        {
            icon: <FaBox />,
            title: "Đóng gói",
        },
        {
            icon: <FaTruck />,
            title: "Vận chuyển",
        },
        {
            icon: <FaCheck />,
            title: "Đã giao",
        },
    ];

    const progressStep = store.getState().order?.progress_step;

    return progressStep !== undefined && progressStep !== -1 ? (
        <SC.Container>
            {steps.map((step, index) => (
                <>
                    {index > 0 ? (
                        <SC.Line className={progressStep >= index ? "active" : "disabled"} />
                    ) : null}
                    <SC.Step>
                        <SC.Icon className={progressStep >= index ? "active" : "disabled"}>
                            {step.icon}
                        </SC.Icon>
                        <SC.Title>{step.title}</SC.Title>
                    </SC.Step>
                </>
            ))}
        </SC.Container>
    ) : null;
};

export default ProgressBar;
