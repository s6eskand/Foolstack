import React, { useState, useEffect } from 'react';

// custom components
import UserProfileHeader from "./UserProfileHeader";

// styling
import styles from './UserProfile.module.css';

function UserProfile(props) {

    useEffect(() => {

    }, [props.user])

    return (
        <div className={styles.root}>
            <div className="container">
                <UserProfileHeader
                    handleAlertClose={props.handleAlertClose}
                    loading={props.loading}
                    requestStatus={props.requestStatus}
                    alertOpen={props.alertOpen}
                    user={props.user}
                    editAccount={props.editAccount}
                />
            </div>
        </div>
    )

}

export default UserProfile;