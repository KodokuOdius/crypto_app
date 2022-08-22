import React from "react";

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
};

export const Card: React.FC<CardProps> = ({ image, title, subtitle, content, onClick }) => {
    return (
        <div className="card" onClick={onClick}>
            <h2 className="title">{title}</h2>
            <h3 className="subtitle">{subtitle}</h3>
            <img src={image} alt="" />
            <div className="content">{content}</div>
        </div>
    );
};