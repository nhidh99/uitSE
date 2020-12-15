import ActionButton from "@/pages/Home/components/ActionButton";
import Toolbar from "@/pages/Home/components/Toolbar";
import React, { memo } from "react";
import { FaFileExport, FaTrash } from "react-icons/fa";

function OrderToolbar() {
    return (
        <Toolbar
            searchPlaceholder=""
            actionButtons={
                <>
                    <ActionButton
                        icon={<FaTrash />}
                        title="Xóa"
                        isMobileHidden
                        onClick={() => {}}
                    />
                    <ActionButton icon={<FaFileExport />} title="Xuất" onClick={() => {}} />
                </>
            }
        />
    );
}

export default memo(OrderToolbar);
