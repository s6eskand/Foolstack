import React, { useState, useEffect } from 'react';

// custom components
import UserProfileHeader from "./UserProfileHeader";
import ProjectListItem from "../projects/ProjectListItem";
import NoProjects from "../projects/NoProjects";

// styling
import styles from './UserProfile.module.css';

// material components
import {
    List
} from "@material-ui/core";

function UserProfile(props) {

    useEffect(() => {

    }, [props.user])

    return (
        <div className="container">
            <div className={styles.root}>
                <UserProfileHeader
                    handleAlertClose={props.handleAlertClose}
                    loading={props.loading}
                    requestStatus={props.requestStatus}
                    alertOpen={props.alertOpen}
                    user={props.user}
                    editAccount={props.editAccount}
                />
                <div className={styles.projectList}>
                {props.user.projects.length > 0 ?
                    <List>
                        {props.user.projects.map(project => (
                            <ProjectListItem
                                project={project}
                            />
                        ))}
                    </List>
                    :
                    <NoProjects
                        user={props.user}
                    />
                }
                </div>
            </div>
        </div>
    )

}

export default UserProfile;