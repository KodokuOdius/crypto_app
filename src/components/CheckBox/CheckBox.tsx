import React from "react";

type CheckBoxProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange'
> & {
    onChange: (value: boolean) => void;
};


export const CheckBox: React.FC<CheckBoxProps> = ({ onChange, checked, ...args }) => {
    return (
        <input type="checkbox" name="CheckBox" id="0" defaultChecked={checked} {...args} onClick={(event) => onChange(event.currentTarget.checked)} />
    );
};