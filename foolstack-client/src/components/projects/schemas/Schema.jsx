import React from 'react';

// material components
import {
    Typography,
    IconButton,
} from "@material-ui/core";

// material icons
import {
    Edit,
} from "@material-ui/icons";

// styling
import styles from './Schema.module.css';

function Schema(props) {

    function dynamicSort(property) {
        return function (a, b) {
            // a should come before b in the sorted order
            if (a[property] < b[property]) {
                return -1;
                // a should come after b in the sorted order
            } else if (a[property] > b[property]) {
                return 1;
                // a and b are the same
            } else {
                return 0;
            }
        }
    }

    return (
        <div className={styles.schema}>
            <h2 className={styles.title}>{props.schema.name}</h2>
            <hr className={styles.horizontalRule} />
            {props.schema.fields.sort(dynamicSort('index')).map(field => (
                <p className={styles.field}><b>{field.name}</b>: {field.type}</p>
            ))}
        </div>
    )
}

export default Schema;