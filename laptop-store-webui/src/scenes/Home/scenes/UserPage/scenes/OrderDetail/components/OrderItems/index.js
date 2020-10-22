import React from "react";
import { Table } from "reactstrap";
import styles from "./styles.module.scss";
import { ProductType } from "../../../../../../../../constants";
import store from "../../../../../../../../services/redux/store";

const OrderItems = ({ type }) => {
    const { typeName, items, totalPrice, totalQuantity, imageURL } = (() => {
        const state = store.getState()["orderDetail"];
        const fieldName = type === "LAPTOP" ? "product" : "promotion";
        return {
            typeName: ProductType[type],
            items: state[fieldName + "s"],
            totalPrice: state[fieldName + "_price"],
            totalQuantity: state[fieldName + "_quantity"],
            imageURL: `/api/images/${
                type === "LAPTOP" ? "/150/laptops" : "/200/promotions"
            }`,
        };
    })();

    const ItemRow = ({ item }) => {
        const imgURL = `${imageURL}/${
            item["product_id"]
        }/${type.toLowerCase()}-${item["product_id"]}.jpg`;

        return (
            <tr>
                <td>
                    <img
                        src={imgURL}
                        alt={item["product_name"]}
                        title={item["product_name"]}
                        width={55}
                        height={55}
                        className={styles.img}
                    />
                    {item["product_name"]}
                </td>

                <td className={styles.unitPriceCol}>
                    {item["unit_price"].toLocaleString()}
                    <sup>đ</sup>
                </td>

                <td className={styles.quantityCol}>{item["quantity"]}</td>

                <td className={styles.totalPriceCol}>
                    {item["total_price"].toLocaleString()}
                    <sup>đ</sup>
                </td>
            </tr>
        );
    };

    return (
        <Table bordered className={styles.table}>
            <tbody>
                <tr>
                    <th className={styles.productsCol}>{typeName}</th>
                    <th className={styles.unitPriceCol}>Đơn giá</th>
                    <th className={styles.quantityCol}>Số lượng</th>
                    <th className={styles.totalPriceCol}>Tạm tính</th>
                </tr>
                {items.map((item) => (
                    <ItemRow item={item} />
                ))}
                <tr>
                    <td colSpan={2}>
                        <b>Tổng cộng:</b>
                    </td>
                    <td className={styles.quantityCol}>
                        <b>{totalQuantity.toLocaleString()}</b>
                    </td>
                    <td className={styles.totalPriceCol}>
                        <b>
                            {totalPrice.toLocaleString()}
                            <sup>đ</sup>
                        </b>
                    </td>
                </tr>
            </tbody>
        </Table>
    );
};

export default OrderItems;
