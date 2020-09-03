import React, { useState } from 'react';
import Markdown from "markdown-to-jsx";

// styling
import styles from '../code/ProjectCode.module.css';

// material components
import {
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogContent,
    DialogActions,
    Button,
    Tabs,
    Tab,
    TextField,
    useMediaQuery,
} from "@material-ui/core";

// constants
import {
    CREATE_README_TITLE,
    CREATE_README_DESCRIPTION, CANCEL, CONTENT, PREVIEW, CREATE,
} from "./constants";

const ReadmePreview = (props) => {
    return (
        <div className={styles.markdownDisplay}>
            <Markdown>
                {props.content}
            </Markdown>
        </div>
    )
}

function CreateReadmeDialog(props) {
    const fullScreen = useMediaQuery('(max-width: 760px)')
    const [content, setContent] = useState('')
    const [value, setValue] = useState(0);

    const handleTabChange = (e, newValue) => {
        setValue(newValue)
    }

    const handleContentChange = (e) => {
        setContent(e.target.value)
    }

    const handleClose = () => {
        setContent('');
        props.handleClose();
    }

    const handleCreate = () => {
        const data = {
            owner: props.owner,
            projectTitle: props.projectTitle,
            content: content
        };

        props.createReadme(data, handleClose)
    }

    return (
        <Dialog open={props.open} fullScreen={fullScreen}>
            <DialogTitle>{CREATE_README_TITLE}</DialogTitle>
            <DialogContent>
                <DialogContentText>{CREATE_README_DESCRIPTION}</DialogContentText>
                <Tabs
                    value={value}
                    onChange={handleTabChange}
                >
                    <Tab label={CONTENT} />
                    <Tab label={PREVIEW} />
                </Tabs>
                <div hidden={value !== 0}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        value={content}
                        multiline
                        rows={20}
                        rowsMax={20}
                        onChange={handleContentChange}
                    />
                </div>
                <div hidden={value !== 1}>
                    <ReadmePreview
                        content={content}
                    />
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleClose}
                >
                    {CANCEL}
                </Button>
                <Button
                    onClick={handleCreate}
                    disabled={content.length === 0}
                    variant="contained"
                    style={{backgroundColor: '#4EB6C4'}}
                >
                    {CREATE}
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default CreateReadmeDialog;