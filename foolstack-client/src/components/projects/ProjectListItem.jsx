import React from 'react';

import githubColors from 'github-colors';

import { useHistory } from 'react-router-dom';

// material components
import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    ListItemIcon,
    Divider
} from "@material-ui/core";

// material icons
import {
    AccountTree,
    Lock,
} from "@material-ui/icons";

// styling
import styles from './ProjectListItem.module.css'

function ProjectListItem(props) {
    const history = useHistory();

    const setColor = (lang) => {
        return githubColors.get(lang, true).color
    }

    const redirect = (path) => () => {
        history.push(path)
    }

    return (
        <div style={{border: '2px solid #CCC', borderRadius: '4px', marginBottom: '25px'}}>
            <ListItem>
                <ListItemIcon>
                    {props.project.isPrivate ?
                        <Lock style={{color: '#4EB6C4'}} /> : <AccountTree style={{color: '#4EB6C4'}} />
                    }
                </ListItemIcon>
                <ListItemText
                    onClick={redirect(`/projects/${props.project.projectTitle}`)}
                    className={styles.projectText}
                    primary={props.project.projectTitle}
                    secondary={props.project.projectDescription}
                />
                <ListItemSecondaryAction>
                    <ListItemText
                        style={{
                            color: `${setColor(props.project.mainLanguage)}`,
                        }}
                        primary={props.project.mainLanguage}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        </div>
    )

}

export default ProjectListItem;