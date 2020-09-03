import React from 'react';

// custom components
import UserProfile from "../userProfile/UserProfile";
import AlertPopup from "../global/alerts/AlertPopup";
import LoadingFullscreen from "../global/LoadingFullscreen";

// redux
import withShipment from "../../withShipment";
import {
    loadingSelector,
    openSelector,
    requestStatusSelector,
} from "../../redux/selectors/global";
import {
    userInfoSelector
} from "../../redux/selectors/auth";
import {
    setOpen,
} from "../../redux/actions/global";
import {
    editAccountInfo
} from "../../redux/actions/auth";
import {ERROR, SUCCESS} from "../global/constants";

function Dashboard(props) {

    const checkEditPermission = () => {
        if (props.userInfo && props.fromSearch) {
            return props.userInfo.username === props.linkedUser
        } else {
            return true
        }
    }

    return (
        <div>
            <UserProfile
                canEdit={checkEditPermission()}
                handleAlertClose={props.setOpen}
                loading={props.loading}
                alertOpen={props.open}
                requestStatus={props.requestStatus}
                user={checkEditPermission() ? props.userInfo : props.user}
                editAccount={props.editAccountInfo}
            />
        </div>
    )

}

const mapStateToProps = (state) => ({
    userInfo: userInfoSelector(state),
    open: openSelector(state),
    loading: loadingSelector(state),
    requestStatus: requestStatusSelector(state),
});

const actionCreators = {
    editAccountInfo,
};

export default withShipment({
    mapStateToProps,
    actionCreators
}, Dashboard)