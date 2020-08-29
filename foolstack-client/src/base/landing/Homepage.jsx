import React from 'react';

// components
import Landing from "./Landing";
import Navbar from "../../components/navigation/Navbar";
import NavbarAuth from "../../components/navigation/NavbarAuth";

// routing
import { Route, Switch, useHistory } from 'react-router-dom';

// redux
import withShipment from "../../withShipment";
import {
    isAuthenticatedSelector
} from "../../redux/selectors/auth";
import {
    isSearchLoadingSelector,
    searchResultsSelector,
} from "../../redux/selectors/project";
import {
    searchUsers
} from "../../redux/actions/project";
import {
    authLogout
} from "../../redux/actions/auth";

// material components
import {useMediaQuery, useTheme} from "@material-ui/core";

function Homepage(props) {
    const history = useHistory();
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return(
        <>
            {props.isAuthenticated ?
                <NavbarAuth
                    authLogout={props.authLogout}
                    loading={props.isSearchLoading}
                    search={props.searchUsers}
                    searchResults={props.searchResults}
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
                        <Route path="/" exact component={Landing}/>
                    </>
                    :
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
})

const actionCreators = {
    authLogout,
    searchUsers,
}

export default withShipment({
    mapStateToProps,
    actionCreators
}, Homepage);