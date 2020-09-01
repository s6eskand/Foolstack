import React, { useState, useEffect } from 'react';

// custom components
import UserProfileHeader from "./UserProfileHeader";
import ProjectListItem from "../projects/ProjectListItem";
import NoProjects from "../projects/NoProjects";

// styling
import styles from './UserProfile.module.css';

// material components
import {
    List,
    TextField,
    Divider
} from "@material-ui/core";

function UserProfile(props) {
    const [state, setState] = useState({
        searchValue: '',
    })

    useEffect(() => {

    }, [props.user])

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const filterByName = (projects) => {
        if (state.searchValue.length > 0) {
            return [...projects.filter(project => project.projectTitle.toLowerCase().includes(state.searchValue.toLowerCase()))];
        } else {
            return projects
        }
    }

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
                <div className={styles.projectContent}>
                    <div className={styles.projectActions}>
                        <TextField
                            onChange={handleChange}
                            value={state.searchValue}
                            name="searchValue"
                            variant="outlined"
                            fullWidth
                            margin="dense"
                            placeholder="Search projects by name..."
                        />
                    </div>
                    {props.user.projects.length > 0 && filterByName(props.user.projects).length > 0 ?
                        <List component="div">
                            {filterByName(props.user.projects).map(project => (
                                <ProjectListItem
                                    project={project}
                                />
                            ))}
                        </List>
                        :
                        <div className={styles.projectList}>
                            <NoProjects
                                user={props.user}
                            />
                        </div>
                    }
                </div>
            </div>
        </div>
    )

}

export default UserProfile;