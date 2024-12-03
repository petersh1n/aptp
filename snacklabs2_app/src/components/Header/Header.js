import './Header.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';


function Header({ onMenuToggle }) {
    const navigate = useNavigate();

    return (
        <header className="header">
            <button className="menu-button" onClick={onMenuToggle}>
                ☰
            </button>
            <h1 className="header-logo" onClick={() => navigate('/')}>
                SnackLabs
            </h1>
            <button className="login-button">
                Login
            </button>
        </header>
    );
}

export default Header;