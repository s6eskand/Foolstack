import React from 'react';

import empty from '../../media/images/create-project.png';
import styles from "./code/ProjectCode.module.css";
import {NO_CODE_FILES_TITLE} from "./code/constants";

function EmptyProjectContentSection(props) {
    return (
        <div className={styles.emptyContent}>
            <h1>{NO_CODE_FILES_TITLE}</h1>
            <img style={{margin: '40px 0'}} width={260} height={260} src={empty} alt=""/>
        </div>
    )
}

export default EmptyProjectContentSection;