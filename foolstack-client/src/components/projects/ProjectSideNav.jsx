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
    Spellcheck,
    Settings,
    Storage,
    Dvr,
} from "@material-ui/icons";

function ProjectSideNav(props) {
    return (
        <Drawer
            variant="persistent"
            open={props.open}
            BackdropProps={{
                invisible: true
            }}
        >
            <Tabs
                style={{marginTop: '100px'}}
                onChange={props.handleTabChange}
                value={props.value}
                orientation="vertical"
                variant="scrollable"
            >
                <Tab icon={<Code />} label="Sample Code" />
                <Tab icon={<Dvr />} label="Services" />
                <Tab icon={<Storage />} label="Database Info" />
                <Tab icon={<Spellcheck />} label="Documentation" />
                {props.canEdit ? <Tab icon={<Settings />} label="Settings" /> : null}
            </Tabs>
        </Drawer>
    )
}

export default ProjectSideNav;