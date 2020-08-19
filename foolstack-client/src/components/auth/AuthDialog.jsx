import React from 'react';

// material components
import {
    Tabs,
    Dialog,
    AppBar,
    Tab,
} from "@material-ui/core";

// components
import Login from "./Login";
import Register from "./Register";
import AlertPopup from "../global/alerts/AlertPopup";

// constants
import {
    LOGIN_TITLE,
    REGISTER_TITLE,
    LOGIN_ERROR,
    LOGIN_SUCCESS
} from "./constants";
import {
    ERROR,
    SUCCESS
} from "../global/constants";

// redux
import withShipment from "../../withShipment";
import {
    authRegister,
    authLogin
} from "../../redux/actions/auth";
import {
    setOpen
} from "../../redux/actions/global";
import {
    requestStatusSelector,
    openSelector,
    loadingSelector
} from "../../redux/selectors/global";

class AuthDialog extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        return (
            <Dialog fullScreen={this.props.fullScreen} open={this.props.dialogOpen || this.props.status.success} onClose={this.props.handleClose}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.props.value}
                        onChange={this.props.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                    >
                        <Tab label={LOGIN_TITLE}/>
                        <Tab label={REGISTER_TITLE}/>
                    </Tabs>
                </AppBar>
                <Login
                    handleClose={this.props.handleClose}
                    value={this.props.value}
                    index={0}
                    handleTabChange={this.props.handleTabChange}
                    authLogin={this.props.authLogin}
                    open={this.props.open}
                    status={this.props.status}
                    loading={this.props.loading}
                    handleAlertClose={this.props.setOpen}
                />
                <Register
                    handleClose={this.props.handleClose}
                    value={this.props.value}
                    index={1}
                    handleTabChange={this.props.handleTabChange}
                    authRegister={this.props.authRegister}
                    open={this.props.open}
                    status={this.props.status}
                    loading={this.props.loading}
                    handleAlertClose={this.props.setOpen}
                />
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => ({
    status: requestStatusSelector(state),
    loading: loadingSelector(state),
    open: openSelector(state)
});

const actionCreators = {
    authLogin,
    authRegister,
    setOpen
};

export default withShipment({
    mapStateToProps,
    actionCreators
}, AuthDialog);