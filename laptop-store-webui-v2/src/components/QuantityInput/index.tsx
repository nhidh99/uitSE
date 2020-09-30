import React from "react";
import { SC } from "./styles";

type QuantityInputProps = {
    value: number;
    maxValue: number;
    minValue: number;
    onIncrease: () => void;
    onDecrease: () => void;
    onEdit: () => void;
};

const QuantityInput = ({
    value,
    maxValue,
    minValue,
    onIncrease,
    onDecrease,
    onEdit,
}: QuantityInputProps) => {
    return (
        <SC.Container>
            <SC.Button onClick={onDecrease}>-</SC.Button>
            <SC.Input
                value={value}
                allowNegative={false}
                isAllowed={(values: any) => {
                    const { formattedValue, floatValue } = values;
                    return (
                        !formattedValue.startsWith("0") &&
                        floatValue <= maxValue
                    );
                }}
            />
            <SC.Button onClick={onIncrease}>+</SC.Button>
        </SC.Container>
    );
};

export default QuantityInput;
