import React, { useState, useEffect } from 'react';
import Markdown from "markdown-to-jsx";
import SyntaxHighlighter from 'react-syntax-highlighter';
import {githubGist} from "react-syntax-highlighter/dist/cjs/styles/hljs";

// custom components
import CodeFile from "./CodeFile";
import EmptyProjectContentSection from "../EmptyProjectContentSection";

// material components
import {
} from "@material-ui/core";

// styling
import styles from './ProjectCode.module.css';

// image
import empty from '../../../media/images/create-project.png';

// constants
import {
    NO_CODE_FILES_TITLE
} from "./constants";

function ProjectCode(props) {
    const [state, setState] = useState({
        readmeContent: '',
    })

    return (
        <div style={{marginLeft: props.marginLeft}} hidden={props.index !== props.value}>
            <div className="container">
                <div className={styles.root}>
                    {props.project.codeFiles.length > 0 ?
                        props.project.codeFiles.map(code => (
                              <CodeFile
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
                        <div className={styles.markdownDisplay}>
                            <Markdown>
                                {props.project.readMe}
                            </Markdown>
                        </div>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
}

export default ProjectCode;