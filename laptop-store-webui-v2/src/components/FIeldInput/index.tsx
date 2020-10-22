import { FieldAttributes } from "formik";
import React from "react";
import { SC } from "./styles";

type FieldInputProps = {
    label: string;
    validate?: boolean;
};

const FieldInput = ({
    label,
    validate,
    ...props
}: FieldInputProps & FieldAttributes<any>) => (
    <>
        <SC.Container>
            <SC.Label htmlFor={props.name}>{label}</SC.Label>
            <SC.InputContainer>
                <SC.Input {...props} />
                {validate ? (
                    <SC.Error name={props.name} component="div" />
                ) : null}
            </SC.InputContainer>
        </SC.Container>
    </>
);

export default FieldInput;
