import React, {useState} from 'react';

// custom components
import EditCodeFileDialog from "../actions/EditCodeFileDialog";
import SyntaxHighlighter from "react-syntax-highlighter";
import {githubGist} from "react-syntax-highlighter/dist/cjs/styles/hljs";

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
    Edit,
    Delete,
} from "@material-ui/icons";

function CodeFile(props) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleOpenDialog = () => {
        setIsDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false)
    }

    const handleDelete = () => {

        const data = {
            owner: props.owner,
            projectTitle: props.projectTitle,
            codeId: props.code.codeId,
        }

        props.deleteCode(data, () => window.location.reload())
        setTimeout(() => window.location.reload(), 1000)

    }

    return (
        <>
        <EditCodeFileDialog
            editCode={props.editCode}
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
                            <IconButton style={{width: '40px'}} onClick={handleOpenDialog}>
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