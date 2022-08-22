import React from "react";

export enum LoaderSize {
    s = 's',
    m = 'm',
    l = 'l'
}
export type LoaderProps = {
    loading?: boolean;
    size?: LoaderSize;
    className?: string;
};

export const Loader: React.FC<LoaderProps> = ({ loading, size = "m", className }) => {
    if (loading === false) { return null }
    const loaderClasses = "loader_size-" + size + (typeof (className) === "undefined" ? "" : " " + className);

    return (
        <div className={loaderClasses}>
            <div id="bar-1" className="bar"></div>
            <div id="bar-2" className="bar"></div>
            <div id="bar-3" className="bar"></div>
        </div>
    );
};