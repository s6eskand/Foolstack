import React from 'react';

// styling
import './Navbar.css';

// routing

// images
import logo from '../../media/images/logo-name-resize.png';

function Navbar() {
    return(
        <nav className="nav">
            <img src={logo} className="logo" alt="foolstack-logo"/>
            <div className="container">
                <ul className="nav-links">
                    <li className="nav-link-1">
                        <a href="#">Features</a>
                    </li>
                    <li className="nav-link-2">
                        <a href="#">Pricing</a>
                    </li>
                    <li className="nav-link-3">
                        <a href="#">Enterprise</a>
                    </li>
                    <hr id="nav-hr-animation"/>
                </ul>
            </div>
            <div className="actions">
                <button className="login-btn">Login</button>
                <button className="register-btn">Sign Up</button>
            </div>
        </nav>
    )
}

export default Navbar;