import React, { Fragment } from "react";
import styles from "./styles.module.scss";
import { Table } from "reactstrap";

const ProductBlock = ({ productsData }) => {
    const { products, productCount, productPrice } = productsData;
    return (
        <Fragment>
            <header className={styles.header}>B. DANH SÁCH SẢN PHẨM</header>

            <Table bordered className={styles.table}>
                <tbody>
                    <tr>
                        <th className={styles.productCol}>Sản phẩm</th>
                        <th className={styles.unitPriceCol}>Đơn giá</th>
                        <th className={styles.quantityCol}>Số lượng</th>
                        <th className={styles.totalPriceCol}>Thành tiền</th>
                    </tr>

                    {products.map((product) => {
                        const {
                            unit_price,
                            total_price,
                            quantity,
                            name,
                            id,
                            alt,
                        } = product;
                        return (
                            <tr>
                                <td className={styles.productCol}>
                                    <img
                                        src={`/api/images/150/laptops/${id}/${alt}.jpg`}
                                        width={60}
                                        height={60}
                                        alt={name}
                                        title={name}
                                        className={styles.img}
                                    />
                                    {name}
                                </td>
                                <td className={styles.unitPriceCol}>
                                    {unit_price.toLocaleString()}
                                    <sup>đ</sup>
                                </td>
                                <td className={styles.quantityCol}>
                                    {quantity}
                                </td>
                                <td className={styles.totalPriceCol}>
                                    {total_price.toLocaleString()}
                                    <sup>đ</sup>
                                </td>
                            </tr>
                        );
                    })}

                    <tr>
                        <td colSpan={2}>
                            <b>Tổng cộng</b>
                        </td>

                        <td className={styles.quantityCol}>
                            <b>{productCount.toLocaleString()}</b>
                        </td>

                        <td className={styles.totalPriceCol}>
                            <b>
                                {productPrice.toLocaleString()}
                                <sup>đ</sup>
                            </b>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Fragment>
    );
};

export default ProductBlock;
