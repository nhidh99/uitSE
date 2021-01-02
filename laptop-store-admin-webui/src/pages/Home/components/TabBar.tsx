import React, { memo, ReactNode, useCallback, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import queryString from "query-string";

type ItemProps = {
    icon: ReactNode;
    title: string;
    value: string;
};

type Props = {
    tabs: ItemProps[];
    targetParam: string;
    activeIndex?: number;
};

function TabBar(props: Props) {
    const { tabs, targetParam, activeIndex } = props;
    const location = useLocation();
    const history = useHistory();

    const initialIndex = useMemo<number>(function () {
        try {
            if (activeIndex) return activeIndex;
            const value = queryString.parse(location.search)[targetParam] as string;
            const index = tabs.map((i) => i.value).indexOf(value);
            return index < 0 ? 0 : index;
        } catch (err) {
            return 0;
        }
    }, []);

    const [curIndex, setCurIndex] = useState<number>(initialIndex);

    const handleClick = useCallback(function (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const value = e.currentTarget.value;
        const index = tabs.map((i) => i.value).indexOf(value);
        setCurIndex(index);

        const params = {
            ...queryString.parse(location.search, { parseNumbers: true }),
            target: "id",
            order: "desc",
            query: "",
            page: 1
        };

        params[targetParam] = value;
        history.push({
            pathname: location.pathname,
            search: queryString.stringify(params, { skipEmptyString: true })
        });
    }, []);

    return (
        <div className="flex border-t border-l shadow md:shadow-none md:border-none">
            {tabs.map((item, index) => (
                <button
                    onClick={handleClick}
                    className={`${
                        index === curIndex
                            ? "bg-gray-100 text-blue-500 border-b md:border-blue-400 md:border-b-3"
                            : "border-b"
                    }                
                    border-r md:border-r-0    
                    flex flex-1 flex-col gap-1 lg:flex-row lg:gap-2 
                    items-center justify-center focus:outline-none 
                    py-3 lg:py-2 text-xs md:text-sm rounded-none`}
                    value={item.value}
                >
                    {item.icon}
                    <span className="hidden md:inline-block">{item.title}</span>
                </button>
            ))}
        </div>
    );
}

export default memo(TabBar);
