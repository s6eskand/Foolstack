import React from 'react';

// material components
import {
    Drawer,
    Tabs,
    Tab,
} from "@material-ui/core";

// material icons
import {
    Code,
    Dvr,
    Storage,
} from "@material-ui/icons";

class ProjectSideNav extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Drawer
                variant="persistent"
                open={this.props.open}
                BackdropProps={{
                    invisible: true
                }}
            >
                <Tabs
                    style={{marginTop: '100px'}}
                    onChange={this.props.handleTabChange}
                    value={this.props.value}
                    orientation="vertical"
                    variant="scrollable"
                >
                    <Tab icon={<Code/>} label="Sample Code"/>
                    <Tab icon={<Storage/>} label="Database Info"/>
                    <Tab icon={<Dvr/>} label="Services"/>
                </Tabs>
            </Drawer>
        )
    }
}

export default ProjectSideNav;