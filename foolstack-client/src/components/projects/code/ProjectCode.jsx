import React, { useState, useEffect } from 'react';
import Markdown from "markdown-to-jsx";
import SyntaxHighlighter from 'react-syntax-highlighter';
import {githubGist} from "react-syntax-highlighter/dist/cjs/styles/hljs";

// custom components
import CodeFile from "./CodeFile";
import EmptyProjectContentSection from "../EmptyProjectContentSection";
import CreateReadmeDialog from "../actions/CreateReadmeDialog";

// styling
import styles from './ProjectCode.module.css';

// constants
import {
    NO_README,
    EDIT_README,
} from "./constants";

function ProjectCode(props) {
    const [state, setState] = useState({
        readmeContent: '',
    })

    return (
        <>
        <CreateReadmeDialog
            createReadme={props.createReadme}
            content={props.project.readMe}
            isEdit={true}
            owner={props.project.owner}
            projectTitle={props.project.projectTitle}
            handleClose={props.handleReadMeClose}
            open={props.isReadMeOpen}
        />
        <div hidden={props.index !== props.value}>
            <div className="container">
                <div className={styles.root}>
                    {props.project.codeFiles.length > 0 ?
                        props.project.codeFiles.map(code => (
                              <CodeFile
                                  user={props.user}
                                  editCode={props.editCode}
                                  owner={props.project.owner}
                                  projectTitle={props.project.projectTitle}
                                  code={code}
                                  languages={props.project.languages}
                              />
                        ))
                        :
                        <EmptyProjectContentSection />
                    }
                    {props.project.readMe ?
                        <>
                        <div className={styles.markdownDisplay}>
                            <Markdown>
                                {props.project.readMe}
                            </Markdown>
                        </div>
                        {Object.keys(props.user).length > 0 ? <button onClick={props.handleReadMeOpen} className={styles.editButton}>{EDIT_README}</button> : null}
                        </>
                        :
                        null
                    }
                </div>
            </div>
        </div>
        </>
    )
}

export default ProjectCode;