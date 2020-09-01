import React from 'react';

import githubColors from 'github-colors';

// material components
import {
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
} from "@material-ui/core";

function ProjectListItem(props) {

    const setColor = (lang) => {
        return githubColors.get(lang, true)
    }

    return (
        <>
            <ListItem>
                <ListItemText
                    primary={props.project.title}
                    secondary={props.project.description}
                />
                <ListItemSecondaryAction>
                    <ListItemText
                        style={{color: `${setColor(props.project.mainLanguage)}`}}
                        primary={props.project.mainLanguage}
                    />
                </ListItemSecondaryAction>
            </ListItem>
        </>
    )

}

export default ProjectListItem;