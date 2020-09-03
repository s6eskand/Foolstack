import React, { useState, useEffect } from 'react';

// material components
import {
    Dialog,
    DialogTitle,
    DialogContentText,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    useMediaQuery
} from "@material-ui/core";

// material icons
import {
    Delete,
    Add
} from "@material-ui/icons";

// constants
import {
    CREATE_SCHEMA_TITLE,
    CREATE_SCHEMA_DESCRIPTION,
    CANCEL,
    SAVE,
    CREATE,
    DATA_TYPES,
} from "./constants";

function SchemaDialog(props) {
    const fullScreen = useMediaQuery('(max-width:760px)');
    const [state, setState] = useState({
        name: '',
        fields: [
            {name: '', type: '', index: 1}
        ]
    })

    useEffect(() => {

    }, [])

    const handleClose = () => {
        setState({
            name: '',
            fields: [{name: '', type: '', index: 1}]
        })
        props.handleClose();
    }

    const handleSubmit = () => {
        const data = {
            isEdit: false,
            schemaId: '',
            owner: props.owner,
            projectTitle: props.projectTitle,
            name: state.name,
            fields: state.fields
        }
        props.createSchema(data, handleClose)
    }

    const handleChange = (e, index) => {
        let fields = [...state.fields];
        fields[index][e.target.name] = e.target.value
        setState({
            ...state,
            fields,
        })
    }

    const handleNameChange = (e) => {
        setState({
            ...state,
            name: e.target.value
        })
    }

    const addField = () => {
        setState({
            ...state,
            fields: [...state.fields, {name: '', type: '', index: state.fields.length + 1}]
        })
    }

    const removeField = (index) => () => {
        let fields = [...state.fields];
        fields.splice(index, 1)
        setState({
            ...state,
            fields,
        })
    }

    return (
        <Dialog open={props.open} fullScreen={fullScreen}>
            <DialogTitle>{CREATE_SCHEMA_TITLE}</DialogTitle>
            <DialogContent>
                <DialogContentText>{CREATE_SCHEMA_DESCRIPTION}</DialogContentText>
                <TextField
                    label="Schema Name"
                    variant="outlined"
                    margin="dense"
                    value={state.name}
                    onChange={handleNameChange}
                />
                {state.fields.map((field, index) => (
                    <div style={{display: 'flex'}}>
                        <TextField
                            fullWidth
                            style={{marginRight: '10px'}}
                            variant="outlined"
                            margin="dense"
                            name="name"
                            label="Name"
                            onChange={(e) => handleChange(e, index)}
                            value={field.name}
                        />
                        <FormControl
                            margin="dense"
                            fullWidth
                            variant="outlined"
                        >
                            <InputLabel>Data Type</InputLabel>
                            <Select
                                label="Data Type"
                                name="type"
                                value={field.type}
                                onChange={(e) => handleChange(e, index)}
                            >
                                {DATA_TYPES.map(type => (
                                    <MenuItem value={type}>{type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <IconButton onClick={removeField(index)} style={{width: '40px'}}>
                            <Delete />
                        </IconButton>
                    </div>
                ))}
                <IconButton onClick={addField} style={{width: '40px'}}>
                    <Add />
                </IconButton>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    variant="outlined"
                    color="secondary"
                >
                    {CANCEL}
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    style={{backgroundColor: '#4EB6C4'}}
                >
                    {CREATE}
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default SchemaDialog;