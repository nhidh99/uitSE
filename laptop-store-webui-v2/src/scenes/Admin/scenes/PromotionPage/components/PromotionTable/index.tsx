import React, { memo, useMemo } from "react";
import { FaGift, FaTruckLoading } from "react-icons/fa";
import EmptyBlock from "../../../../../../components/EmptyBlock";
import Paginate from "../../../../../../components/Paginate";
import promotionApi from "../../../../../../services/api/promotionApi";
import useTableFetch from "../../../../../../services/hooks/useTableFetch";
import PromotionSummaryModel from "../../../../../../values/models/PromotionSummaryModel";
import SelectAll from "../../../components/SelectAll";
import SelectItem from "../../../components/SelectItem";
import { SC } from "./styles";

const PromotionTable = () => {
    const { list, count, page, setTarget } = useTableFetch<PromotionSummaryModel>(
        promotionApi.getByPage
    );

    const headers = useMemo(
        () => [
            { name: "Mã KM", target: "id" },
            { name: "Khuyến mãi", target: "name" },
            { name: "Hình ảnh", target: undefined },
            { name: "Số lượng", target: "quantity" },
            { name: "Đơn giá", target: "price" },
        ],
        []
    );

    return (
        <SC.Container>
            {list ? (
                count > 0 ? (
                    <SC.Table>
                        <tr>
                            <SelectAll />
                            {headers.map((h) => (
                                <th
                                    onClick={h.target ? () => setTarget(h.target) : undefined}
                                    className={h.target ? "sortable" : undefined}
                                >
                                    {h.name}
                                </th>
                            ))}
                        </tr>
                        {list.map((product) => (
                            <tr onClick={() => alert("hey")}>
                                <SelectItem />
                                <td className="id">{product.id}</td>
                                <td className="name">{product.name}</td>
                                <td className="image">
                                    <img
                                        src={product.image_url}
                                        width={30}
                                        height={30}
                                        alt={product.name}
                                    />
                                </td>
                                <td className="quantity">{product.quantity}</td>
                                <td className="price">
                                    {product.price.toLocaleString()}
                                    <u>đ</u>
                                </td>
                            </tr>
                        ))}
                    </SC.Table>
                ) : (
                    <EmptyBlock icon={<FaGift />} title="Không tìm thấy khuyến mãi" paddingless />
                )
            ) : (
                <EmptyBlock icon={<FaTruckLoading />} title="Đang tải thông tin" />
            )}
            <Paginate count={count} initialPage={page || 1} sizePerPage={10} />
        </SC.Container>
    );
};

export default memo(PromotionTable);
