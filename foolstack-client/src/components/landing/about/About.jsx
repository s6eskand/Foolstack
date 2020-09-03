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
                            Foolstack is a web service aiming to help users document, plan, design, and build software
                            in a more intuitive fashion. <br/>
                            <br/>
                            You can browse Foolstack user projects without signing up if you are simply looking to see
                            how other developers plan out large or small projects. <br/>
                            <br/>
                            Foolstack also allows you to load projects from Github, linking information such as pull requests,
                            issues, commit history, and other smaller details. <br/>
                            <br/>
                            From hosting sample code, to organizing database and API endpoint structure, Foolstack does it all!
                            <br/>
                            <br/>
                            Make an account today and get started on your first project!
                        </p>
                    </div>
                </div>
            </div>
        );
    }

}

export default About;