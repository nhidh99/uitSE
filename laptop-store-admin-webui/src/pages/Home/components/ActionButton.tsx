import React, { ReactNode, memo } from "react";

type Props = {
    icon: ReactNode;
    title?: string;
    isMobileHidden?: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function ActionButton(props: Props) {
    const { icon, title, isMobileHidden, onClick } = props;
    return (
        <button
            onClick={onClick}
            className={`${isMobileHidden ? "hidden md:flex" : "flex"} 
            items-center gap-1 hover:bg-gray-200
            px-3 md:px-4 py-2 rounded-md border border-gray-300 shadow
            text-xs sm:text-sm md:text-base focus:outline-none select-none`}
        >
            {icon}
            <span className="hidden md:inline">{title}</span>
        </button>
    );
}

export default memo(ActionButton);
