import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "@components/Header";
import './App.scss';
import Main from '../../pages/Main';
import Coin from '@pages/Coin';

export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="coin/:id" element={<Coin />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};
