import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Card from "@components/Card";
import Loader from "@components/Loader";
import { LoaderSize } from "@components/Loader/Loader";
import "./Coin.scss";
import axios from "axios";
import { useState } from "react";
import { useCurrencyContext } from "@pages/Main/Main";
import { isConstructorDeclaration } from "typescript";

const Coin = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [coin, setCoin] = useState<any>(null);
    const { currency } = useCurrencyContext();

    useEffect(() => {
        const result = axios({
            method: "get",
            url: `https://api.coingecko.com/api/v3/coins/${id}`
        });
        result.then(data => setCoin(data.data));
        setIsLoading(false);

        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1&interval=hourly";
    }, []);
    return (
        <div className="coin_info">
            {!coin || isLoading ? <Loader loading={isLoading} size={LoaderSize.l} /> :
                <Card image={coin.image.large} title={coin.name} subtitle={coin.symbol}
                    content={
                        <div className="info">
                            <h3 className="coin_price">{coin.market_data.current_price.usd}{currency.symbol}</h3>
                            <h4 className={"coin_change " + (coin.market_data.price_change_percentage_24h < 0 ? "red" : "green")}>{coin.market_data.price_change_percentage_24h}%</h4>
                            <div className="high__low">
                                <h5 className="coin_high">max(24h): {coin.market_data.high_24h.usd}{currency.symbol}</h5>
                                <h5 className="coin_low">min(24h): {coin.market_data.low_24h.usd}{currency.symbol}</h5>
                            </div>
                        </div>
                    }
                />
            }
        </div>
    );
};
export default Coin;