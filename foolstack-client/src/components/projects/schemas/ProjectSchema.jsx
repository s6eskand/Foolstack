import React from 'react';

// custom components
import EmptyProjectContentSection from "../EmptyProjectContentSection";
import Schema from "./Schema";

// styling
import styles from './ProjectSchema.module.css'

function ProjectSchema(props) {

    return (
        <div style={{marginLeft: props.marginLeft}} hidden={props.index !== props.value}>
            <div className="container">
                <div className={styles.root}>
                    {props.project.schemas.length > 0 ?
                        props.project.schemas.map(schema => (
                            <Schema
                                schema={schema}
                            />
                        ))
                        :
                        <EmptyProjectContentSection />
                    }
                </div>
            </div>
        </div>
    )

}

export default ProjectSchema;