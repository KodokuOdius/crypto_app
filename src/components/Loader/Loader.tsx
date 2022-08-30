import React from "react";
import "./Loader.scss";

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

const Loader: React.FC<LoaderProps> = ({ loading, size = "m", className }) => {
    if (loading === false) { return null }
    const loaderClasses = "loader_size-" + size + (typeof (className) === "undefined" ? "" : " " + className);

    return (
        <div className="lds-circle">
            <div className={loaderClasses}></div>
        </div>
    );
};
export default Loader;