import React from 'react';

// styling
import './About.css';

// images
import boyServer from '../../../media/images/boy-server.png';

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div className="container">
                <div className="about-title">
                    <div className="about-title-image">
                        <img className="about-boy-server-img" src={boyServer} alt="Boy with server"/>
                    </div>
                    <div className="about-title-content">
                        <p>
                            Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing
                            industries for previewing layouts and visual mockups. <br/>
                            <br/>
                            at. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                            deserunt mollit anim id est laborum.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

}

export default About;