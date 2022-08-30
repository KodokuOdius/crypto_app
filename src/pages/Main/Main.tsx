import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from "@components/Card";
import Loader from '@components/Loader/Loader';
import { LoaderSize } from '@components/Loader/Loader';
import "./Main.scss";


const Main = () => {
    const [coins, setCoins] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const result = axios({
            method: "get",
            url: "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd"
        });
        setLoading(false);
        result.then(data => { setCoins(data.data); console.log(data) });
    }, []);

    return (
        <div className="main_page">
            {isLoading ? <Loader loading={isLoading} size={LoaderSize.l} /> :
                <ul className="coins_list" style={{ width: 1000, margin: "0 auto" }}>
                    {coins.map((coin: any) => {
                        const coinChangeClass = coin.price_change_percentage_24h < 0 ? "red" : "green"
                        return <li key={coin.id} className="coin_item">
                            <Card image={coin.image} title={coin.name} subtitle={coin.symbol} sparklineNumber={coin.image.split("/")[5]}
                                content={
                                    <div className="info">
                                        <h3 className="coin_price">{coin.current_price}$</h3>
                                        <h4 className={"coin_change " + coinChangeClass}>{coin.price_change_percentage_24h}%</h4>
                                        <div className="high__low">
                                            <h5 className="coin_high">↑ {coin.high_24h}$ - </h5>
                                            <h5 className="coin_low">{coin.low_24h}$ ↓</h5>
                                        </div>
                                    </div>
                                }
                            />
                        </li>
                    })}
                </ul>
            }
        </div>
    );
};
export default Main;