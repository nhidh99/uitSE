import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../../../../services/redux/rootReducer";
import { Converter } from "../../../../../../../../../../global/constants";
import { SC } from "./styles";

const SpecInfo = () => {
    const { cpu, ram, hardDrive, monitor } = useSelector((state: RootState) => {
        // @ts-ignore
        const details = state.productInfo.details;
        return {
            cpu: details?.cpu,
            ram: details?.ram,
            hardDrive: details?.hard_drive,
            monitor: details?.monitor,
        };
    });

    const specs = [
        {
            title: "CPU",
            content: `${Converter.CPU[cpu["type"]]}, ${cpu["speed"]} GHz`,
        },
        {
            title: "RAM",
            content: `${ram["size"]} GB ${ram["type"]} ${ram["bus"]} MHz`,
        },
        {
            title: "Ổ cứng",
            content: `${hardDrive["type"]} 
            ${
                hardDrive["size"] >= 1024
                    ? `${hardDrive["size"] / 1024} TB`
                    : `${hardDrive["size"]} GB`
            } 
            ${hardDrive["detail"]}`,
        },
        {
            title: "Màn hình",
            content: `${monitor["size"]} inch,
            ${Converter.RESOLUTION[monitor["resolution_type"]]} 
            (${monitor["resolution_width"]} x ${monitor["resolution_height"]})`,
        },
    ];

    return (
        <>
            <SC.Header>Thông số cơ bản</SC.Header>
            <SC.List>
                {specs.map((spec) => (
                    <SC.ListItem>
                        <b>{spec.title}: </b>
                        {spec.content}
                    </SC.ListItem>
                ))}
            </SC.List>
        </>
    );
};

export default SpecInfo;
