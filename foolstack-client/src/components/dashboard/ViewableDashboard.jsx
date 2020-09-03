import React, {useEffect} from "react";

import Dashboard from "./Dashboard";
import NotFound from "../../base/NotFound";

import {useParams} from 'react-router-dom'
// redux
import withShipment from "../../withShipment";
import {usersSelector} from '../../redux/selectors/account';
import {listAllUsers,} from "../../redux/actions/account";

const ViewableDashboard = (props) => {
    const { username } = useParams()

    useEffect(() => {
        props.listAllUsers();
    }, [props.users])

    const findUserIndex = () => {
        if (props.users) {
            return props.users.findIndex(user => user.username === username)
        }
    }

    if (findUserIndex() === -1) {
        return (
            <NotFound />
        )
    } else {
        return (
            <Dashboard
                fromSearch={true}
                user={props.users[findUserIndex()]}
                linkedUser={username}
            />
        )
    }

}

const mapStateToProps = (state) => ({
    users: usersSelector(state),
})

const actionCreators = {
    listAllUsers,
}

export default withShipment({
    mapStateToProps,
    actionCreators
}, ViewableDashboard);