import React from "react";
import { Table } from "reactstrap";
import styles from "./styles.module.scss";
import {
    convertBrandType,
    convertCPUType,
    convertResolutionType,
} from "../../../../../../services/helper/converter";
import { useSelector } from "react-redux";
import { CardDesignType, PINType } from "../../../../../../constants";

const DetailBlock = () => {
    const product = useSelector((state) => state.productDetail.product);
    const { cpu, ram, hard_drive, monitor, battery } = product;

    return (
        <Table bordered className={styles.table}>
            <tbody>
                <tr>
                    <th>Thương hiệu</th>
                    <td>{convertBrandType(product["brand"])}</td>
                </tr>
                <tr>
                    <th>CPU</th>
                    <td>{`${convertCPUType(cpu["type"])} ${cpu["detail"]}, ${
                        cpu["speed"]
                    } GHz`}</td>
                </tr>
                <tr>
                    <th>Tốc độ CPU tối đa</th>
                    <td>{cpu["max_speed"]}</td>
                </tr>
                <tr>
                    <th>RAM</th>
                    <td>{`${ram["size"]} GB ${ram["type"]} ${ram["bus"]} MHz${
                        ram["detail"] === null ? "" : ` (${ram["detail"]})`
                    }, ${
                        ram["max_size"] === null
                            ? "Không hỗ trợ nâng cấp"
                            : `Hỗ trợ tối đa ${ram["max_size"]} GB`
                    }`}</td>
                </tr>
                <tr>
                    <th>Ổ cứng</th>
                    <td>
                        {`${hard_drive["type"]} 
                            ${
                                hard_drive["size"] >= 1024
                                    ? `${hard_drive["size"] / 1024} TB`
                                    : `${hard_drive["size"]} GB`
                            } 
                            ${product["hard_drive"]?.["detail"] ?? ""}`}
                    </td>
                </tr>
                <tr>
                    <th>Màn hình</th>
                    <td>
                        {`${monitor["size"]} inch,
                            ${convertResolutionType(
                                monitor["resolution_type"]
                            )} 
                            (${monitor["resolution_width"]} x ${
                            monitor["resolution_height"]
                        })`}
                    </td>
                </tr>
                <tr>
                    <th>Card màn hình</th>
                    <td>
                        {monitor["graphics_card"]} (
                        {CardDesignType[monitor["card_design"]]})
                    </td>
                </tr>
                <tr>
                    <th>Cổng kết nối</th>
                    <td>{product["ports"]}</td>
                </tr>
                <tr>
                    <th>Kết nối không dây</th>
                    <td>{product["wireless"]}</td>
                </tr>
				<tr>
                    <th>Khe đọc thẻ nhớ</th>
                    <td>{product?.["sd_cards"] ?? " Không hỗ trợ"}</td>
                </tr>
				<tr>
                    <th>Thông tin PIN</th>
                    <td>{battery["detail"]} ({PINType[battery['type']]})</td>
                </tr>
                <tr>
                    <th>Webcam</th>
                    <td>{product?.["webcam"] ?? " Không hỗ trợ"}</td>
                </tr>
                <tr>
                    <th>Công nghệ âm thanh</th>
                    <td>{product["sound_tech"]}</td>
                </tr>
                <tr>
                    <th>Hệ điều hành</th>
                    <td>{product["os"]}</td>
                </tr>
                <tr>
                    <th>Thiết kế</th>
                    <td>{product["design"]}</td>
                </tr>
                <tr>
                    <th>Kích thước</th>
                    <td>{product["size"]}</td>
                </tr>
                <tr>
                    <th>Khối lượng</th>
                    <td>{product["weight"]} kg</td>
                </tr>
                <tr>
                    <th>Tính năng khác</th>
                    <td>{product?.["specials"] ?? "Không"}</td>
                </tr>
            </tbody>
        </Table>
    );
};

export default DetailBlock;
