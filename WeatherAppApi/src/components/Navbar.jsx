import { useState } from "react";
import { Link } from "react-router-dom";
import './Navbar.css';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="navbar">
            <div className="navLogo"> Pogodynka</div>

            <div className={`navLinks ${isOpen ? "open" : ""}`}>
                <Link to="/" onClick={() => setIsOpen(false)}>Szukaj</Link>
                <Link to="/saved" onClick={() => setIsOpen(false)}>Pogoda</Link>
                <Link to="/settings" onClick={() => setIsOpen(false)}>Ustawienia</Link>
            </div>

            <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
            </div>
        </nav>
    )
}

export default Navbar;