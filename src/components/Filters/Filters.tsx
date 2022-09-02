import Button from "@components/Button";
import { ButtonColor } from "@components/Button/Button";
import MultiDropdown from "@components/MultiDropdown";
import { Option } from "@components/MultiDropdown/MultiDropdown";
import { useCurrencyContext } from "@pages/Main/Main";
import { useEffect } from "react";
import "./Filters.scss";


export enum FiltersValues {
    all = "all",
    red = "red",
    green = "green"
};

export type FiltersProps = {
    onFiltersChange: (value: string) => void;
    selectedFilter: string
};

const Filters: React.FC<FiltersProps> = ({ onFiltersChange, selectedFilter }) => {
    const currencyContext = useCurrencyContext();
    const onBtnClick = (e: React.MouseEvent) => {
        const filterValue = e.currentTarget.textContent?.toString();
        if (!!filterValue) {
            onFiltersChange(filterValue?.toLowerCase().toString());
        };
    };

    const options: Option[] = [
        { key: "usd", value: "Dollar $" },
        { key: "rub", value: "Ruble ₽" },
        { key: "jpy", value: "Jena ¥" }
    ];

    const onChangeMulti = (value: Option[]) => {
        currencyContext.setCurrency({
            symbol: value[0].value.slice(-1)[0],
            name: value[0].key
        });
    };
    const pluralizeOptionsMulti = (value: Option[]) => {
        return value[0].value;
    };

    useEffect(() => {
        document.querySelector(".filters__btns")?.querySelectorAll("button").forEach(btn => {
            if (btn.textContent?.toLowerCase().toString() === selectedFilter) {
                btn.classList.add("selected");
            } else if (btn.classList.contains("selected")) {
                btn.classList.remove("selected");
            };
        });
    }, [selectedFilter]);

    return (
        <div className="filters">
            <h4 className="filters__title">
                <p className="title__text">Choose your filter</p>
                <MultiDropdown options={options} value={options} onChange={onChangeMulti} pluralizeOptions={pluralizeOptionsMulti} />
            </h4>
            <div className="filters__btns">
                <Button onClick={onBtnClick} color={ButtonColor.secondary}>All</Button>
                <Button onClick={onBtnClick} color={ButtonColor.secondary}>Green</Button>
                <Button onClick={onBtnClick} color={ButtonColor.secondary}>Red</Button>
            </div>
        </div>
    );
};

export default Filters;