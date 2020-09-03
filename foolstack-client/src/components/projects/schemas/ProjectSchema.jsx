import React, {useState} from 'react';
import {v4 as uuidv4} from 'uuid';

// custom components
import EmptyProjectContentSection from "../EmptyProjectContentSection";
import Schema from "./Schema";
import SchemaDialog from "../actions/SchemaDialog";

// styling
import styles from './ProjectSchema.module.css'

function ProjectSchema(props) {
    const [index, setIndex] = useState(0)

    return (
        <>
        <div hidden={props.index !== props.value}>
            <div className="container">
                <div className={styles.root}>
                    {props.project.schemas.length > 0 ?
                        props.project.schemas.map((schema) => {
                            return (
                            <Schema
                                // handleEdit={handleEdit}
                                user={props.user}
                                handleSchemaOpen={props.handleSchemaOpen}
                                handleSchemaClose={props.handleSchemaClose}
                                isSchemaOpen={props.isSchemaDialogOpen}
                                schemas={props.project.schemas}
                                schema={schema}
                                owner={props.project.owner}
                                projectTitle={props.project.projectTitle}
                            />
                        )})
                        :
                        <EmptyProjectContentSection />
                    }
                </div>
            </div>
        </div>
        </>
    )

}

export default ProjectSchema;