import { BrowserRouter, Routes, Route, Link, useParams, Navigate } from 'react-router-dom';
import Header from "@components/Header";
import './App.scss';
import Main from '../../pages/Main';

export default function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Main />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};
