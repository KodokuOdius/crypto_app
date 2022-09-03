import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Card from "@components/Card";
import Loader from "@components/Loader";
import { LoaderSize } from "@components/Loader/Loader";
import "./Coin.scss";
import axios from "axios";
import { useState } from "react";
import { useCurrencyContext } from "@pages/Main/Main";
import Button from "@components/Button";

import { Chart } from "react-chartjs-2";
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from "chart.js";

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);


const Coin = () => {
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [coin, setCoin] = useState<any>(null);
    const [interval, setInterval] = useState<string>("hourly");
    const [days, setDays] = useState<number>(1);
    const [history, setHistory] = useState<any>(null);
    const { currency } = useCurrencyContext();

    useEffect(() => {
        const coinData = axios({
            method: "get",
            url: `https://api.coingecko.com/api/v3/coins/${id}`
        });
        const historyData = axios({
            method: "get",
            url: `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
            params: {
                vs_currency: "usd",
                interval: interval,
                days: days
            }
        });
        historyData.then(data => {
            const labels: string[] = [];
            const prices: number[] = [];
            data.data.prices.forEach((price: number[]) => {
                const time = new Intl.DateTimeFormat(
                    "ru", {
                    month: days < 4 ? undefined : "2-digit",
                    day: days < 4 ? undefined : "2-digit",
                    hour: days < 4 ? "2-digit" : undefined,
                    minute: days < 4 ? "2-digit" : undefined,
                }
                ).format(price[0])
                labels.push(time);
                prices.push(Number(price[1].toFixed(2)));
            });

            setHistory({
                labels: labels,
                datasets: [{ data: prices }]
            });
        });
        coinData.then(data => setCoin(data.data));
        setIsLoading(false);
    }, [id, currency, days]);

    const handleClickDays = (event: React.MouseEvent) => {
        const day = Number(event.currentTarget.textContent?.toString().split(" ")[0]);
        if (day > 5) {
            setInterval("daily");
        } else {
            setInterval("hourly");
        };
        setDays(day);
    };

    return (
        <div className="coin_info_container">
            {!coin || !history || isLoading ? <Loader loading={isLoading} size={LoaderSize.l} /> :
                <div className="coin_info">
                    <div className="coin_chart">
                        <Chart type="line" data={history} options={{
                            plugins: {
                                legend: { display: true },
                                title: { display: true, text: id?.toUpperCase() },
                                tooltip: { mode: "index", intersect: false, caretSize: 5, footerAlign: "center", titleAlign: "center", enabled: false },
                            }
                        }} />
                    </div>
                    <div className="days">
                        <Button onClick={handleClickDays} >1 day</Button>
                        <Button onClick={handleClickDays} >5 day</Button>
                        <Button onClick={handleClickDays} >10 day</Button>
                        <Button onClick={handleClickDays} >15 day</Button>
                        <Button onClick={handleClickDays} >30 day</Button>
                        <Button onClick={handleClickDays} >60 day</Button>
                    </div>
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
                </div>
            }
        </div>
    );
};
export default Coin;