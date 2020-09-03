import React, {useEffect, useState} from 'react';

// material components
import {
    Button, Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl, IconButton,
    InputLabel, MenuItem,
    Select,
    TextField, useMediaQuery
} from "@material-ui/core";

// constants
import {CANCEL, CREATE, CREATE_SCHEMA_DESCRIPTION, CREATE_SCHEMA_TITLE, DATA_TYPES, SAVE} from "./constants";

// material icons
import {Add, Delete} from "@material-ui/icons";

function EditSchemaDialog(props) {
    const fullScreen = useMediaQuery('(max-width:760px)');
    const [state, setState] = useState({
        name: '',
        fields: [
            {name: '', type: '', index: 1}
        ]
    })

    useEffect(() => {
        setState({
            name: props.schema.name,
            fields: props.schema.fields
        })
    }, [])

    const handleClose = () => {
        setState({
            name: props.schema.name,
            fields: props.schema.fields
        })
        props.handleClose();
    }

    const handleSubmit = () => {
        const data = {
            isEdit: true,
            schemaId: props.schema.schemaId,
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
                    {props.isEdit ? SAVE : CREATE}
                </Button>
            </DialogActions>
        </Dialog>
    )

}

export default EditSchemaDialog;