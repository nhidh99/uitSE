import React, { memo, useEffect, useMemo, useState } from "react";
import queryString from "query-string";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import useListFetch from "@/services/hooks/useListFetch";
import ProductItemModel from "@/types/model/ProductItemModel";
import productAPI from "@/services/api/productAPI";

function ProductTable() {
    const { list, loading } = useListFetch<ProductItemModel>(productAPI.getByPage);

    return loading ? null : (
        <table className="text-xs sm:text-sm">
            <tr>
                <th>Mã SP</th>
                <th>Sản phẩm</th>
                <th>Hình ảnh</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Đánh giá</th>
            </tr>
            {list.map((item) => (
                <tr>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>
                        <img src={item.image_url} width={50} height={50} />
                    </td>
                    <td>{item.quantity}</td>
                    <td>{item.unit_price.toLocaleString()}</td>
                    <td>{item.avg_rating.toFixed(1)}</td>
                </tr>
            ))}
        </table>
    );
}

export default memo(ProductTable);
