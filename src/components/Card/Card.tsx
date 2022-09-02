// import Loader from "@components/Loader/Loader";
// import { LoaderSize } from "@components/Loader/Loader";
// import axios from "axios";
// import React, { useEffect } from "react";
// import { useState } from "react";
import React from "react";
import "./Card.scss";

type CardProps = {
    /** URL изображения */
    image: string;
    /** Заголовок карточки */
    title: React.ReactNode;
    /** Подзаголовок карточки */
    subtitle: React.ReactNode;
    /** Содержимое карточки (футер/боковая часть), может быть пустым */
    content?: React.ReactNode;
    /** Клик на карточку */
    onClick?: React.MouseEventHandler;
    sparklineNumber?: string;
};

const Card: React.FC<CardProps> = ({ image, title, subtitle, content, onClick, sparklineNumber }) => {
    // const [loading, setLoading] = useState(true);
    // const [sparkline, setSparkline] = useState(null);
    // useEffect(() => {
    //     const result = axios({
    //         method: "get",
    //         url: `https://www.coingecko.com/coins/${sparklineNumber}/sparkline`
    //     })
    //     result.then(data => console.log(data));
    //     setLoading(false);
    // }, []);
    return (
        <div className="card" onClick={onClick}>
            <div className="card__img">
                <img className="card__img_image" src={image} alt={title?.toString()} />
            </div>
            <div className="card__head">
                <h2 className="card__head_title">{title}</h2>
                <h3 className="card__head_subtitle">{subtitle}</h3>
            </div>
            <div className="card__content">
                {content}
            </div>
        </div>
    );
};
export default Card;