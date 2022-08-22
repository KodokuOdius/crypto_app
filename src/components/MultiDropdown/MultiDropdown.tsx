import React from "react";

export type Option = {
    /** Ключ варианта, используется для отправки на бек/использования в коде */
    key: string;
    /** Значение варианта, отображается пользователю */
    value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
    /** Массив возможных вариантов для выбора */
    options: Option[];
    /** Текущие выбранные значения поля, массив может быть пустым */
    value: Option[];
    /** Callback, вызываемый при выборе варианта */
    onChange: (value: Option[]) => void;
    /** Заблокирован ли дропдаун */
    disabled?: boolean;
    /** Преобразовать выбранные значения в строку. Отображается в дропдауне в качестве выбранного значения */
    pluralizeOptions: (value: Option[]) => string;
}


export const MultiDropdown: React.FC<MultiDropdownProps> = ({ options, value, onChange, disabled, pluralizeOptions }) => {
    // event: React.ChangeEvent<HTMLSelectElement>
    const [isVisible, setIsVisible] = React.useState(false);

    const handleSelect = (index: number) => {
        const selectedOption = options[index];
        if (!value.includes(selectedOption)) {
            value.push(selectedOption);
            onChange([selectedOption]);
        } else {

            onChange([...options.slice(0, index), ...options.slice(index + 1)]);
        };
    };

    return (
        <div className="dropdown">
            <span className="selected" onClick={() => setIsVisible(!isVisible)}>
                {pluralizeOptions(value)}
            </span>
            <ul className="selections">
                {
                    (!disabled && isVisible) &&
                    options.map((option, index) => {
                        return <li key={option.key} id={option.key} value={option.key} onClick={() => handleSelect(index)}>{option.value}</li>
                    })
                }
            </ul>
        </div>
    );
};