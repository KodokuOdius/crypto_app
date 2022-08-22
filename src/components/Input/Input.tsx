import React from "react";

export type InputProps = Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange'
> & {
    value: string;
    onChange: (value: string) => void;
};

export const Input: React.FC<InputProps> = ({ value, onChange, disabled, className, ...inputAttrs }) => {
    const inpClasses = (disabled === true ? "input_disabled" : "") + (typeof (className) !== "undefined" ? " " + className : "")
    return (
        <div className="input">
            <input type="text" value={value} disabled={disabled}
                onChange={(event) => disabled !== true ? onChange(event.currentTarget.value) : ""}
                className={inpClasses} {...inputAttrs} />
        </div>
    );
};