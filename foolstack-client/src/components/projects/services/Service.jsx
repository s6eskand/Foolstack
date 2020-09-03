import React, {useEffect, useState} from 'react';

import SyntaxHighlighter from "react-syntax-highlighter";
import {githubGist} from "react-syntax-highlighter/dist/cjs/styles/hljs";

import EditServiceDialog from "../actions/EditServiceDialog";

// material components
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    Tabs,
    Tab, IconButton,
} from "@material-ui/core";

// material icons
import {
    Edit,
    ExpandMore,
    Delete
} from "@material-ui/icons";

// styling
import styles from './Service.module.css';

function Service(props) {
    const [value, setValue] = useState(0)
    const [isServiceOpen, setIsServiceOpen] = useState(false)

    const handleServiceOpen = () => {
        setIsServiceOpen(true)
    }

    const handleServiceClose = () => {
        setIsServiceOpen(false)
    }

    const getMethodColor = (method) => {
        switch (method) {
            case 'GET':
                return 'green'
            case 'POST':
                return 'yellow'
            case 'DELETE':
                return 'red'
            case 'PUT':
                return 'blue'
            case 'PATCH':
                return 'blue'
            default:
                return 'grey'
        }
    }

    const handleTabChange = (e, newValue) => {
        setValue(newValue)
    }

    const handleDelete = () => {
        const data = {
            owner: props.project.owner,
            projectTitle: props.project.projectTitle,
            serviceId: props.service.serviceId
        }

        props.deleteService(data, () => window.location.reload())
        setTimeout(() => window.location.reload(), 1000)
    }

    const displaySampleRequests = (requests) => {
        return (
            <>
                <Tabs
                    variant="scrollable"
                    value={value}
                    onChange={handleTabChange}
                >
                    {requests.map(request => (
                        <Tab label={request.language} />
                    ))}
                </Tabs>
                {requests.map((request, index) => (
                    <div hidden={index !== value}>
                        <SyntaxHighlighter
                            wrapLines
                            showLineNumbers
                            style={githubGist}
                            language={`${request.language.toLowerCase()}`}
                        >
                            {request.requestBody}
                        </SyntaxHighlighter>
                    </div>
                ))}
            </>
        )
    }

    return (
        <>
            <EditServiceDialog
                service={props.service}
                open={isServiceOpen}
                handleClose={handleServiceClose}
                createService={props.createService}
                owner={props.project.owner}
                projectTitle={props.project.projectTitle}
            />
            <Accordion
                style={{
                    marginBottom: '20px',
                    border: '1px solid #4EB6C4',
                    boxShadow: 'none',
                    borderRadius: '4px'
                }}
            >
                <AccordionSummary
                    expandIcon={
                        <>
                            <ExpandMore />
                            {Object.keys(props.user).length > 0 ?
                                <>
                                <IconButton style={{width: '40px'}} onClick={handleServiceOpen}>
                                    <Edit />
                                </IconButton>
                                <IconButton style={{width: '40px'}} onClick={handleDelete}>
                                    <Delete />
                                </IconButton>
                                </>
                                : null
                            }
                        </>
                    }
                >
                    <div className={styles.title}>
                        {props.service.name}
                        <p><span style={{color: `${getMethodColor(props.service.requestMethod)}`}} >{props.service.requestMethod}</span> {props.service.path}</p>
                    </div>
                </AccordionSummary>
                <AccordionDetails>
                    <div className={styles.expandedContent}>
                    {props.service.queryParams.length > 0 ?
                        <div className={styles.rootContent}>
                            <Typography>
                                Query Parameters
                            </Typography>
                            <hr className={styles.hr} />
                            <List component="div">
                            {props.service.queryParams.map(query => (
                                <>
                                    <ListItem>
                                        <ListItemText
                                            primary={query.name}
                                            secondary={query.description}
                                        />
                                        <ListItemSecondaryAction>
                                            <ListItemText
                                                primary={`Type: ${query.type}`}
                                            />
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                </>
                            ))}
                            </List>
                        </div> : null
                    }
                    {props.service.sampleRequests.length > 0 ?
                        <div className={styles.rootContent}>
                            <Typography>
                                Sample Requests
                            </Typography>
                            <hr className={styles.hr} />
                            {displaySampleRequests(props.service.sampleRequests)}
                        </div> : null
                    }
                    {props.service.sampleResponse ?
                        <div className={styles.rootContent}>
                            <Typography>
                                Sample Response
                            </Typography>
                            <hr className={styles.hr} />
                            <SyntaxHighlighter
                                wrapLines
                                showLineNumbers
                                style={githubGist}
                                language={`${props.service.sampleResponse.language.toLowerCase()}`}
                            >
                                {props.service.sampleResponse.responseBody}
                            </SyntaxHighlighter>
                        </div> : null
                    }
                    {props.service.responseFields.length > 0 ?
                        <div className={styles.rootContent}>
                            <Typography>
                                Query Parameters
                            </Typography>
                            <hr className={styles.hr} />
                            <List component="div">
                                {props.service.responseFields.map(response => (
                                    <>
                                        <ListItem>
                                            <ListItemText
                                                primary={response.name}
                                                secondary={response.description}
                                            />
                                            <ListItemSecondaryAction>
                                                <ListItemText
                                                    primary={`Type: ${response.type}`}
                                                />
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                    </>
                                ))}
                            </List>
                        </div> : null
                    }
                    </div>
                </AccordionDetails>
            </Accordion>
        </>
    )

}

export default Service;