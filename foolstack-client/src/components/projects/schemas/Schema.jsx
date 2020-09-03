import React, {useEffect, useState} from 'react';

// custom components
import EditSchemaDialog from "../actions/EditSchemaDialog";

// material components
import {
    IconButton,
} from "@material-ui/core";

// material icons
import {
    Edit,
    Delete,
} from "@material-ui/icons";

// styling
import styles from './Schema.module.css';

function Schema(props) {
    const [isEditOpen, setIsEditOpen] = useState(false)

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

    const handleOpenEdit = () => {
        setIsEditOpen(true)
    }

    const handleCloseEdit = () => {
        setIsEditOpen(false)
    }

    const handleDelete = () => {
        const data = {
            owner: props.owner,
            projectTitle: props.projectTitle,
            name: props.schema.name,
            schemaId: props.schema.schemaId
        }

        props.deleteSchema(data)
    }

    return (
        <>
        <EditSchemaDialog
            schema={props.schema}
            owner={props.owner}
            projectTitle={props.projectTitle}
            handleClose={handleCloseEdit}
            open={isEditOpen}
            createSchema={props.createSchema}
        />
        <div className={styles.schema}>
            <div className={styles.mainContent}>
                <h2 className={styles.title}>{props.schema.name}</h2>
                {props.user ?
                    <>
                    <IconButton onClick={handleOpenEdit} style={{width: '40px'}}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={handleDelete} style={{width: '40px'}}>
                        <Delete />
                    </IconButton></> : null
                }
            </div>
            <hr className={styles.horizontalRule} />
            {props.schema.fields.sort(dynamicSort('index')).map(field => (
                <p className={styles.field}><b>{field.name}</b>: {field.type}</p>
            ))}
        </div>
        </>
    )
}

export default Schema;