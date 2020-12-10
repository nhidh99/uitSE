import ActionButton from "@/pages/Home/components/ActionButton";
import SearchBar from "@/pages/Home/components/SearchBar";
import React, { memo } from "react";
import { FaFileExport, FaTrash } from "react-icons/fa";

function ProductToolbar() {
    return (
        <div className="flex justify-between gap-3">
            <SearchBar placeholder="Tim kiem" />
            <div className="flex gap-3">
                <ActionButton icon={<FaTrash />} title="Xóa" onClick={() => {}} />
                <ActionButton icon={<FaFileExport />} title="Xuất" onClick={() => {}} />
            </div>
        </div>
    );
}

export default memo(ProductToolbar);
