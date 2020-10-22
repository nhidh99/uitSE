import React from "react";
import { Table } from "reactstrap";
import styles from "./styles.module.scss";
import store from "../../../../../../../../services/redux/store";

const OrderInfo = () => {
    const { order, productQuantity } = (() => {
        const state = store.getState()["orderDetail"];
        return {
            order: state["order"],
            productQuantity: state["product_quantity"],
        };
    })();

    return (
        <Table bordered>
            <tbody>
                <tr>
                    <th>Dự kiến giao hàng</th>
                    <td>
                        {order["status"] === "CANCELED" ? (
                            <span className={styles.canceled}>
                                Đơn hàng đã bị hủy
                            </span>
                        ) : (
                            order["delivery_date"]
                        )}
                    </td>
                    <th>Phí vận chuyển</th>
                    <td>
                        {order?.["transport_fee"].toLocaleString()}
                        <sup>đ</sup>
                    </td>
                </tr>
                <tr>
                    <th>Giá trị đơn hàng</th>
                    <td>
                        {order["total_price"].toLocaleString()}
                        <sup>đ</sup>
                    </td>
                    <th>Số lượng sản phẩm</th>
                    <td>{productQuantity}</td>
                </tr>
                <tr>
                    <th>Tên người nhận </th>
                    <td>{order["receiver_name"]}</td>
                    <th>Điện thoại </th>
                    <td>{order["receiver_phone"]}</td>
                </tr>
                <tr>
                    <th>Địa chỉ nhận </th>
                    <td colSpan="3">
                        {[
                            order["address_num"],
                            order["street"],
                            order["ward"],
                            order["district"],
                            order["city"],
                        ].join(", ")}
                    </td>
                </tr>
            </tbody>
        </Table>
    );
};

export default OrderInfo;
