import React, { memo } from "react";
import { SSC } from "../../../../share.styles";

const OrderFilter = () => {
    return (
        <SSC.Select name="status" style={{ flex: "1" }}>
            <option value="pending">Chờ duyệt</option>
            <option value="received">Tiếp nhận</option>
            <option value="packaged">Đóng gói</option>
            <option value="delivering">Vận chuyển</option>
            <option value="delivered">Đã giao</option>
            <option value="canceled">Đã huỷ</option>
        </SSC.Select>
    );
};

export default memo(OrderFilter);
