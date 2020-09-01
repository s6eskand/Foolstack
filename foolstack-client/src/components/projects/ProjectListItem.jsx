import React from 'react';

import githubColors from 'github-colors';

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

function ProjectListItem(props) {

    const setColor = (lang) => {
        return githubColors.get(lang, true).color
    }

    return (
        <div style={{border: '2px solid #CCC', borderRadius: '4px'}}>
            <ListItem>
                <ListItemIcon>
                    {props.project.isPrivate ?
                        <Lock /> : <AccountTree />
                    }
                </ListItemIcon>
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
        </div>
    )

}

export default ProjectListItem;