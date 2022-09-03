import { Link } from "react-router-dom";
import "./Header.scss";

export default function Header() {
    return (
        <header className="main_header">
            <nav className="main_header__navigate">
                <Link to="/">Main Page</Link>
                <Link to="/search">Search</Link>
                <Link to="/favorite">Favorite</Link>
            </nav>
        </header>
    );
};