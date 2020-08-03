import React from 'react';

// styling
import './Navbar.css';

// routing

// images
import logo from '../../media/images/logo-name-resize.png';
import AuthDialog from "../auth/AuthDialog";

class Navbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            value: 0
        }
    }

    handleLoginOpen = () => {
        this.setState({
            open: true,
            value: 0
        })
    }

    handleRegisterOpen = () => {
        this.setState({
            open: true,
            value: 1
        })
    }

    handleClose = () => {
        this.setState({open: false})
    }

    handleTabChange = (e, newValue) => {
        this.setState({value: newValue})
    }

    render() {
        return (
            <>
                <AuthDialog
                    open={this.state.open}
                    handleTabChange={this.handleTabChange}
                    handleClose={this.handleClose}
                    value={this.state.value}
                />
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
                        <button className="login-btn" onClick={this.handleLoginOpen}>Login</button>
                        <button className="register-btn" onClick={this.handleRegisterOpen}>Sign Up</button>
                    </div>
                </nav>
            </>
        )
    }
}

export default Navbar;