import React, { Fragment } from "react";
import styles from "./styles.module.scss";
import { Table } from "reactstrap";

const PromotionBlock = ({ promotionsData }) => {
    const { promotions, promotionCount, promotionPrice } = promotionsData;
    return (
        <Fragment>
            <header className={styles.header}>C. DANH SÁCH KHUYẾN MÃI</header>

            <Table bordered className={styles.table}>
                <tbody>
                    <tr>
                        <th className={styles.promotionCol}>Khuyến mãi</th>
                        <th className={styles.unitPriceCol}>Đơn giá</th>
                        <th className={styles.quantityCol}>Số lượng</th>
                        <th className={styles.totalPriceCol}>Thành tiền</th>
                    </tr>

                    {promotions.map((promotion) => {
                        const {
                            quantity,
                            unit_price,
                            total_price,
                            id,
                            alt,
                            name,
                        } = promotion;
                        return (
                            <tr>
                                <td className={styles.promotionCol}>
                                    <img
                                        src={`/api/images/200/promotions/${id}/${alt}}.jpg`}
                                        width={40}
                                        height={40}
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
                            <b>{promotionCount.toLocaleString()}</b>
                        </td>

                        <td className={styles.totalPriceCol}>
                            <b>
                                {promotionPrice.toLocaleString()}
                                <sup>đ</sup>
                            </b>
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Fragment>
    );
};

export default PromotionBlock;
