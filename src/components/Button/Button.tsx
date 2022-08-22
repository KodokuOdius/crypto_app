import React from "react";
import { Loader } from "../Loader";

export enum ButtonColor {
    primary = 'primary',
    secondary = 'secondary'
}

export type ButtonProps = React.PropsWithChildren<{
    /**
     * Если true, то внутри кнопки вместе с children отображается компонент Loader
     * Также кнопка должна переходить в состояние disabled
     * По умолчанию - false
     */
    loading?: boolean;
    color?: ButtonColor;
}> & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({ loading, color = "primary", children, className = "", disabled, ...buttonAttrs }) => {
    const btnClasses = "button_color-" + color + (disabled === true || loading === true ? " button_disabled" : "") + " " + className;
    return (
        <button color={color} disabled={disabled || loading} className={btnClasses} {...buttonAttrs}>
            {loading && <Loader loading={loading} />}
            {children}
        </button>
    );
};
