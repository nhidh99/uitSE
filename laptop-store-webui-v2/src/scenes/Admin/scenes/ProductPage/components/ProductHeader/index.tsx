import React, { memo } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { SSC } from "../../../../share.styles";

const ProductHeader = () => {
    return (
        <SSC.SectionTitle>
            Danh sách sản phẩm
            <div>
                <button className="delete">
                    <FaTrash /> XOÁ
                </button>

                <button className="insert">
                    <FaPlus /> THÊM
                </button>
            </div>
        </SSC.SectionTitle>
    );
};

export default memo(ProductHeader);
