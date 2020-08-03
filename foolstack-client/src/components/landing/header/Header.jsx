import React from 'react';

// styling
import './Header.css';

// images
import logo from '../../../media/images/logo-short.png';
import girlOnDesk from '../../../media/images/girl-desk.png';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="container">
                <div className="header-title">
                    <div className="header-title-content">
                        <img className="header-logo" src={logo} alt="Foolstack Logo"/>
                        <p className="header-title-text">
                            <span style={{color: '#4EB6C4'}}>Integrating </span>
                            <span style={{color: '#FC7F64'}}>Development </span>
                            <span style={{color: '#4EB6C4'}}>and </span>
                            <span style={{color: '#FED893'}}>Design </span>
                            <span style={{color: '#4EB6C4'}}>all in one</span>
                        </p> <br/>
                        <p>Sign up to get started on your first project!</p>
                    </div>
                    <div className="header-title-image">
                        <img className="header-girl-img" src={girlOnDesk} alt="Girl on computer"/>
                    </div>
                </div>
            </div>
        );
    }

}

export default Header;