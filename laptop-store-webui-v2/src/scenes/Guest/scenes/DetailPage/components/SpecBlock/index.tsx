import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../services/redux/rootReducer";
import BatteryDesignConstants from "../../../../../../values/constants/BatteryDesignConstants";
import BrandConstants from "../../../../../../values/constants/BrandConstants";
import CardDesignConstants from "../../../../../../values/constants/CardDesignConstants";
import CpuConstants from "../../../../../../values/constants/CpuConstants";
import ResolutionConstants from "../../../../../../values/constants/ResolutionConstants";
import ProductSpecModel from "../../../../../../values/models/ProductSpecModel";
import { SC } from "./styles";

const SpecBlock = () => {
    const product: ProductSpecModel = useSelector(
        // @ts-ignore
        (state: RootState) => state.productInfo.details
    );

    const { cpu, ram, hard_drive, monitor, battery } = product;
    const specs = [
        {
            title: "Thương hiệu",
            detail: BrandConstants[product["brand"]],
        },
        {
            title: "CPU",
            detail: `${CpuConstants[cpu["type"]]} ${cpu["detail"]}, ${
                cpu["speed"]
            } GHz`,
        },
        {
            title: "Tốc độ CPU tối đa",
            detail: cpu["max_speed"],
        },
        {
            title: "RAM",
            detail: `${ram["size"]} GB ${ram["type"]} ${ram["bus"]} MHz${
                ram["detail"] === null ? "" : ` (${ram["detail"]})`
            }, ${
                ram["max_size"] === null
                    ? "Không hỗ trợ nâng cấp"
                    : `Hỗ trợ tối đa ${ram["max_size"]} GB`
            }`,
        },
        {
            title: "Ổ cứng",
            detail: `${hard_drive["type"]} 
            ${
                hard_drive["size"] >= 1024
                    ? `${hard_drive["size"] / 1024} TB`
                    : `${hard_drive["size"]} GB`
            } 
            ${product["hard_drive"]?.["detail"] ?? ""}`,
        },
        {
            title: "Màn hình",
            detail: `${monitor["size"]} inch,
            ${ResolutionConstants[monitor["resolution_type"]]} 
            (${monitor["resolution_width"]} x ${monitor["resolution_height"]})`,
        },
        {
            title: "Card màn hình",
            detail: `${monitor["graphics_card"]} (${
                CardDesignConstants[monitor["card_design"]]
            })`,
        },
        {
            title: "Cổng kết nối",
            detail: product["ports"],
        },
        {
            title: "Kết nối không dây",
            detail: product["wireless"],
        },
        {
            title: "Khe đọc thẻ nhớ",
            detail: product?.["sd_cards"] ?? " Không hỗ trợ",
        },
        {
            title: "Thông tin PIN",
            detail: `${battery["detail"]} (${
                BatteryDesignConstants[battery["type"]]
            })`,
        },
        {
            title: "Webcam",
            detail: product?.["webcam"] ?? " Không hỗ trợ",
        },
        {
            title: "Công nghệ âm thanh",
            detail: product["sound_tech"],
        },
        {
            title: "Hệ điều hành",
            detail: product["os"],
        },
        {
            title: "Thiết kế",
            detail: product["design"],
        },
        {
            title: "Kích thước",
            detail: product["size"],
        },
        {
            title: "Khối lượng",
            detail: `${product["weight"]} kg`,
        },
        {
            title: "Tính năng khác",
            detail: product?.["specials"] ?? "Không",
        },
    ];

    return (
        <SC.Table>
            <tbody>
                {specs.map((spec) => (
                    <tr>
                        <th>{spec.title}</th>
                        <td>{spec.detail}</td>
                    </tr>
                ))}
            </tbody>
        </SC.Table>
    );
};

export default SpecBlock;
