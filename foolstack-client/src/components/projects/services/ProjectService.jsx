import React from 'react';

// custom components
import EmptyProjectContentSection from "../EmptyProjectContentSection";
import Service from "./Service";

// styling
import styles from './ProjectService.module.css';

function ProjectService(props) {

    return (
        <>
            <div hidden={props.index !== props.value}>
                <div className="container">
                    <div className={styles.root}>
                        {props.project.services.length > 0 ?
                            props.project.services.map(service => (
                                <Service
                                    deleteService={props.deleteService}
                                    user={props.user}
                                    project={props.project}
                                    createService={props.createService}
                                    service={service}
                                />
                            ))
                            :
                            <EmptyProjectContentSection />
                        }
                    </div>
                </div>
            </div>
        </>
    )

}

export default ProjectService;