import React from "react";
import "./WithLoader.scss";
import Loader from "@components/Loader/Loader";

export type WithLoaderProps = React.PropsWithChildren<{
    loading: boolean;
}>;

const WithLoader: React.FC<WithLoaderProps> = ({ loading, children }) => {
    return (
        <div>
            {loading && <Loader />}
            {children}
        </div>
    );
};
export default WithLoader;