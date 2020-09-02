import React from 'react';

// material components
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
} from "@material-ui/core";

// material icons
import {
    ExpandMore,
} from "@material-ui/icons";
import SyntaxHighlighter from "react-syntax-highlighter";
import {githubGist} from "react-syntax-highlighter/dist/cjs/styles/hljs";

function CodeFile(props) {
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMore />}
            >{props.code.name}</AccordionSummary>
            <AccordionDetails>
                <SyntaxHighlighter
                    language={`${props.code.language.toLowerCase()}`}
                    style={githubGist}
                    wrapLines
                    showLineNumbers
                >
                    {props.code.content}
                </SyntaxHighlighter>
            </AccordionDetails>
        </Accordion>
    )
}

export default CodeFile;