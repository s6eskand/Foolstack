import React, { useState, useEffect } from 'react';

// material components
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    useMediaQuery,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@material-ui/core";

// constants
import {
    CANCEL,
    CREATE, CREATE_CODE_FILE_DESCRIPTION, CREATE_CODE_FILE_TITLE,
    CREATE_README_DESCRIPTION,
    CREATE_README_TITLE, SAVE,
} from "./constants";

function CodeFileDialog(props) {
    const fullScreen = useMediaQuery('(max-width: 760px)')
    const [state, setState] = useState({
        language: '',
        content: '',
        name: '',
    });

    useEffect(() => {
        setState({
            ...state,
            language: props.language ? props.language : '',
            content: props.content ? props.content : '',
            name: props.name ? props.name : ''
        })
    }, [])

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleClose = () => {
        setState({
            language: props.isEdit ? props.language : '',
            content: props.isEdit ? props.content : '',
            name: props.isEdit ? props.name : ''
        })
        props.handleClose();
    }

    const handleCreate = () => {
        const data = {
            owner: props.owner,
            projectTitle: props.projectTitle,
            codeId: props.codeId ? props.codeId : '',
            content: state.content,
            language: state.language,
            name: state.name,
        }

        if (props.isEdit) {
            props.editCode(data, handleClose)
        } else {
            props.createCode(data, handleClose)
        }
    }

    return (
        <Dialog open={props.open} fullScreen={fullScreen}>
            <DialogTitle>{CREATE_CODE_FILE_TITLE}</DialogTitle>
            <DialogContent>
                <DialogContentText>{CREATE_CODE_FILE_DESCRIPTION}</DialogContentText>
                <div style={{display: 'flex'}}>
                    <TextField
                        style={{marginRight: '10px'}}
                        label="File Name"
                        margin="dense"
                        name="name"
                        variant="outlined"
                        value={state.name}
                        onChange={handleChange}
                    />
                    <FormControl
                        variant="outlined"
                        margin="dense"
                        fullWidth
                    >
                        <InputLabel>Language</InputLabel>
                        <Select
                            label="Language"
                            name="language"
                            value={state.language}
                            onChange={handleChange}
                        >
                            {props.languages.map(language => (
                                <MenuItem value={language}>{language}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <TextField
                    name="content"
                    fullWidth
                    variant="outlined"
                    margin="dense"
                    value={state.content}
                    multiline
                    rows={20}
                    rowsMax={20}
                    onChange={handleChange}
                />
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
                    disabled={state.content.length === 0 || state.language.length === 0 || state.name.length === 0}
                    variant="contained"
                    style={{backgroundColor: '#4EB6C4'}}
                >
                    {props.isEdit ? CREATE : SAVE}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default CodeFileDialog