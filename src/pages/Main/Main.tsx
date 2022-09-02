import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "@components/Card";
import Loader from '@components/Loader';
import Filters from '@components/Filters';
import { FiltersValues } from '@components/Filters/Filters';
import { LoaderSize } from '@components/Loader/Loader';
import { createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import "./Main.scss";


export type CurrencyOptional = {
    symbol: string, // "$"
    name: string // "usd"
};

const CurrencyContext = createContext({
    currency: { symbol: "$", name: "usd" },
    setCurrency: (currency: CurrencyOptional) => { }
});
export const useCurrencyContext = () => useContext(CurrencyContext);


const Main = () => {
    const [coins, setCoins] = useState([]);
    const [filter, setFilter] = useState("all");
    const [isLoading, setLoading] = useState(true);
    const [currency, setCurrency] = useState({ symbol: "$", name: "usd" });

    useEffect(() => {
        const result = axios({
            method: "get",
            url: `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`
        });
        setLoading(false);
        result.then(data => setCoins(data.data));
    }, [currency]);

    const onFiltersChange = (filterValue: string) => {
        if (filterValue in FiltersValues) {
            setFilter(filterValue);
        };
    };

    return (
        <div className="main_page">
            <CurrencyContext.Provider value={{
                currency, setCurrency
            }}>
                <Filters onFiltersChange={onFiltersChange} selectedFilter={filter} />
            </CurrencyContext.Provider>
            {isLoading ? <Loader loading={isLoading} size={LoaderSize.l} /> :
                <ul className="coins_list">
                    {coins.map((coin: any) => {
                        const coinChangeClass = coin.price_change_percentage_24h < 0 ? "red" : "green"
                        if (filter === "all" || filter === coinChangeClass) {
                            return <li key={coin.id} className="coin_item">
                                <Link to={`coin/${coin.id}`}>
                                    <Card image={coin.image} title={coin.name} subtitle={coin.symbol} sparklineNumber={coin.image.split("/")[5]}
                                        content={
                                            <div className="info">
                                                <h3 className="coin_price">{coin.current_price}{currency.symbol}</h3>
                                                <h4 className={"coin_change " + coinChangeClass}>{coin.price_change_percentage_24h}%</h4>
                                                <div className="high__low">
                                                    <h5 className="coin_high">max(24h): {coin.high_24h}{currency.symbol}</h5>
                                                    <h5 className="coin_low">min(24h): {coin.low_24h}{currency.symbol}</h5>
                                                </div>
                                            </div>
                                        }
                                    />
                                </Link>
                            </li>
                        };
                    })}
                </ul>
            }
        </div>
    );
};
export default Main;