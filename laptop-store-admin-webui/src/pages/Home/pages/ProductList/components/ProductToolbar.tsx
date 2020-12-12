import ActionButton from "@/pages/Home/components/ActionButton";
import SearchBar from "@/pages/Home/components/SearchBar";
import React, { memo } from "react";
import { FaFileExport, FaTrash } from "react-icons/fa";

function ProductToolbar() {
    return (
        <div className="flex justify-between gap-3">
            <SearchBar placeholder="Tim kiem" />
            <div className="flex gap-3">
                <span className="hidden md:inline">
                    <ActionButton icon={<FaTrash />} title="Xóa" onClick={() => {}} />
                </span>
                <ActionButton icon={<FaFileExport />} title="Xuất" onClick={() => {}} />
            </div>
        </div>
    );
}

export default memo(ProductToolbar);
