import React from 'react';

// images
import empty from '../media/images/404-image.png';

// styling
import styles from './NotFound.module.css';

// constants
import {
    NOT_FOUND_SECONDARY,
    NOT_FOUND_TITLE,
    HOME,
} from "./constants";

function NotFound() {
    return(
        <div className={styles.root}>
            <h1 style={{marginBottom: '50px'}}>{NOT_FOUND_TITLE}</h1>
            <h2 style={{marginBottom: '50px'}}>{NOT_FOUND_SECONDARY}</h2>
            <img src={empty} alt=""/>
        </div>
    )
}

export default NotFound;