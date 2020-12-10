import React, { ReactNode, memo } from "react";

type Props = {
    icon: ReactNode;
    title: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

function ActionButton(props: Props) {
    const { icon, title, onClick } = props;
    return (
        <button
            onClick={onClick}
            className="flex items-center gap-1 hover:bg-gray-200 
            px-4 py-2 rounded-md border border-gray-300 shadow
            text-xs sm:text-sm md:text-base focus:outline-none"
        >
            {icon}
            <span className="hidden sm:inline">{title}</span>
        </button>
    );
}

export default memo(ActionButton);
