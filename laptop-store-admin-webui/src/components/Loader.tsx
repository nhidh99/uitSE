import React, { memo } from "react";
import { FaTruckLoading } from "react-icons/fa";

function Loader() {
    return (
        <div className="flex flex-col gap-1 justify-center items-center flex-grow">
            <FaTruckLoading className="text-6xl" />
            <div>Vui lòng chờ</div>
        </div>
    );
}

export default memo(Loader);
