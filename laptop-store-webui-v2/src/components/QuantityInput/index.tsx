import React, { useState } from "react";
import { SC } from "./styles";

type QuantityInputProps = {
    defaultValue: number;
    maxValue: number;
    minValue: number;
    onIncrease: () => void;
    onDecrease: () => void;
    onEdit: () => void;
};

const QuantityInput = ({
    defaultValue,
    maxValue,
    minValue,
    onIncrease,
    onDecrease,
    onEdit,
}: QuantityInputProps) => {
    const [value, setValue] = useState<number>(defaultValue);

    return (
        <SC.Container>
            <SC.Button>-</SC.Button>
            <SC.Input
                defaultValue={defaultValue}
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
            <SC.Button>+</SC.Button>
        </SC.Container>
    );
};

export default QuantityInput;
