import React from 'react';

// material components
import {
    Tabs,
    Dialog,
    AppBar,
    Tab,
    Paper,
    useMediaQuery,
    useTheme
} from "@material-ui/core";

// components
import Login from "./Login";
import Register from "./Register";

// constants
import {
    LOGIN_TITLE,
    REGISTER_TITLE
} from "./constants";

function AuthDialog(props) {

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog fullScreen={fullScreen} open={props.open} onClose={props.handleClose}>
            <AppBar position="static" color="default">
                <Tabs
                    value={props.value}
                    onChange={props.handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                >
                    <Tab label={LOGIN_TITLE} />
                    <Tab label={REGISTER_TITLE} />
                </Tabs>
            </AppBar>
            <Login
                handleClose={props.handleClose}
                value={props.value}
                index={0}
                handleTabChange={props.handleTabChange}
            />
            <Register
                handleClose={props.handleClose}
                value={props.value}
                index={1}
                handleTabChange={props.handleTabChange}
            />
        </Dialog>
    );
}

export default AuthDialog;