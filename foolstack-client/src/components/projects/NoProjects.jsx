import React from 'react';

// styling
import styles from './NoProjects.module.css';

// images
import empty from '../../media/images/404-image.png';

// constants
import {
    EMPTY_PROJECTS_TITLE
} from "./constants";

function NoProjects(props) {
    return (
        <div className={styles.root}>
            <h3 className={styles.title}>{EMPTY_PROJECTS_TITLE}</h3>
            <img src={empty} alt=""/>
        </div>
    )
}

export default NoProjects;