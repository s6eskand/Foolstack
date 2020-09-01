import React, {useEffect} from 'react';

// components
import Landing from "./Landing";
import Navbar from "../../components/navigation/Navbar";
import NavbarAuth from "../../components/navigation/NavbarAuth";
import Dashboard from "../../components/dashboard/Dashboard";

// routing
import { Route, Switch, useHistory } from 'react-router-dom';

// redux
import withShipment from "../../withShipment";
import {
    isAuthenticatedSelector, userInfoSelector
} from "../../redux/selectors/auth";
import {
    isSearchLoadingSelector,
    searchResultsSelector,
} from "../../redux/selectors/project";
import {
    searchUsers
} from "../../redux/actions/project";
import {
    editAccountInfo,
    authLogout,
    validateUser,
} from "../../redux/actions/auth";

// material components
import {useMediaQuery, useTheme} from "@material-ui/core";

function Homepage(props) {
    const history = useHistory();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        if (props.isAuthenticated) {
            props.validateUser();
        }
    }, [])

    return(
        <>
            {props.isAuthenticated ?
                <NavbarAuth
                    user={props.userInfo}
                    authLogout={props.authLogout}
                    loading={props.isSearchLoading}
                    search={props.searchUsers}
                    searchResults={props.searchResults}
                    editAccount={props.editAccountInfo}
                />
                :
                <Navbar
                    fullScreen={fullScreen}
                    history={history}
                />
            }
            <Switch>
                {props.isAuthenticated ?
                    <>
                        {/* If accessing routes that do not exist, link to base page for now */}
                        <Route path="/" component={Dashboard}/>
                    </>
                    :
                    // If acessing routes that do not exist, link to base page for now
                    <Route path="/" exact component={Landing}/>
                }
            </Switch>
        </>
    )
}

const mapStateToProps = (state) => ({
    isAuthenticated: isAuthenticatedSelector(state),
    isSearchLoading: isSearchLoadingSelector(state),
    searchResults: searchResultsSelector(state),
    userInfo: userInfoSelector(state),
})

const actionCreators = {
    authLogout,
    searchUsers,
    validateUser,
    editAccountInfo,
}

export default withShipment({
    mapStateToProps,
    actionCreators
}, Homepage);