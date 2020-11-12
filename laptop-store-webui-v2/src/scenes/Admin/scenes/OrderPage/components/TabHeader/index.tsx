/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, ReactNode, useCallback, useMemo, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { SC } from "./styles";
import queryString from "query-string";

type TabHeaderItemProps = {
    icon: ReactNode;
    title: string;
    value: string;
};

type TabHeaderProps = {
    items: TabHeaderItemProps[];
    targetParam: string;
    activeIndex?: number;
};

const TabHeader = ({ items, activeIndex, targetParam }: TabHeaderProps) => {
    const location = useLocation();
    const history = useHistory();

    const initialIndex = useMemo<number>(() => {
        try {
            if (activeIndex) return activeIndex;
            const value = queryString.parse(location.search)[targetParam] as string;
            const index = items.map((i) => i.value).indexOf(value);
            return index < 0 ? 0 : index;
        } catch (err) {
            return 0;
        }
    }, []);

    const [curIndex, setCurIndex] = useState<number>(initialIndex);

    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const value = e.currentTarget.value;
        const index = items.map((i) => i.value).indexOf(value);
        setCurIndex(index);

        const params = {
            ...queryString.parse(location.search, { parseNumbers: true }),
            target: "id",
            order: "desc",
            query: "",
            page: 1,
        };

        // @ts-ignore
        params[targetParam] = value;
        history.push({
            pathname: location.pathname,
            search: queryString.stringify(params, { skipEmptyString: true }),
        });
    }, []);

    return (
        <SC.Container>
            {items.map((item, index) => (
                <SC.Button
                    onClick={handleClick}
                    className={index === curIndex ? "active" : undefined}
                    value={item.value}
                >
                    {item.icon}
                    {item.title}
                </SC.Button>
            ))}
        </SC.Container>
    );
};

export default memo(TabHeader);
