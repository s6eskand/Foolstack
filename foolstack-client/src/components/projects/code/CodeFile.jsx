import React, {useState} from 'react';

// custom components
import CodeFileDialog from "../actions/CodeFileDialog";

// material components
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    IconButton,
} from "@material-ui/core";

// material icons
import {
    ExpandMore,
    Edit
} from "@material-ui/icons";

import SyntaxHighlighter from "react-syntax-highlighter";
import {githubGist} from "react-syntax-highlighter/dist/cjs/styles/hljs";

function CodeFile(props) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false)
    }

    return (
        <>
        <CodeFileDialog
            editCode={props.editCode}
            isEdit={true}
            open={isDialogOpen}
            handleClose={handleCloseDialog}
            owner={props.owner}
            projectTitle={props.projectTitle}
            content={props.code.content}
            name={props.code.name}
            codeId={props.code.codeId}
            language={props.code.language}
            languages={props.languages}
        />
        <Accordion>
            <AccordionSummary
                expandIcon={
                    <>
                        <ExpandMore />
                    </>
                }
            >
                {props.code.name}
            </AccordionSummary>
            <AccordionDetails>
                <div style={{width: '100%'}}>
                    <SyntaxHighlighter
                        language={`${props.code.language.toLowerCase()}`}
                        style={githubGist}
                        wrapLines
                        showLineNumbers
                    >
                        {props.code.content}
                    </SyntaxHighlighter>
                </div>
            </AccordionDetails>
        </Accordion>
        </>
    )
}

export default CodeFile;