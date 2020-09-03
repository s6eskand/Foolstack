import React, { useState } from 'react';

// material components
import {
    Dialog,
    DialogActions,
    DialogContentText,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    useMediaQuery,
    IconButton,
} from "@material-ui/core";

// material icons
import {
    Delete,
    Add
} from "@material-ui/icons";

// constants
import {
    DATA_TYPES,
    CANCEL,
    CREATE,
    CREATE_SERVICE_DESCRIPTION,
    CREATE_SERVICE_TITLE, REQUEST_METHODS,
} from "./constants";

function CreateServiceDialog(props) {
    const hrStyle = {
        width: '100%',
        backgroundColor: '#CCC',
        height: '1px'
    }
    const fullScreen = useMediaQuery('(max-width:760px)');
    const [state, setState] = useState({
        name: '',
        requestMethod: '',
        path: '',
        sampleResponse: {language: '', responseBody: ''},
        queryParams: [{name: '', type: '', description: '', index: 1}],
        sampleRequests: [{language: '', requestBody: '', index: 1}],
        responseFields: [{name: '', type: '', description: '', index: 1}]
    })
    const [initialState, ] = useState(state)

    const handleBasicChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleComplexChange = (e, index, name) => {
        let toEdit = [...state[name]]
        toEdit[index][e.target.name] = e.target.value
        setState({
            ...state,
            [name]: toEdit
        })
    }

    const handleFieldChange = (e, index) => {
        let toChange = [...state.responseFields]
        toChange[index][e.target.name] = e.target.value
        setState({
            ...state,
            responseFields: toChange
        })
    }

    const handleResponseChange = (e) => {
        let toChange = {...state.sampleResponse}
        toChange[e.target.name] = e.target.value
        setState({
            ...state,
            sampleResponse: toChange
        })
    }

    const handleClose = () => {
        setState(initialState)
        props.handleClose();
    }

    const handleSubmit = () => {
        const data = {
            owner: props.owner,
            projectTitle: props.projectTitle,
            isEdit: false,
            serviceId: '',
            name: state.name,
            requestMethod: state.requestMethod,
            path: state.path,
            queryParams: state.queryParams,
            sampleRequests: state.sampleRequests,
            sampleResponse: state.sampleResponse,
            responseFields: state.responseFields,
        }

        props.createService(data, handleClose)
    }

    const addQueryParam = () => {
        setState({
            ...state,
            queryParams: [...state.queryParams, {name: '', type: '', description: '', index: state.queryParams.length + 1}]
        })
    }

    const addSampleReq = () => {
        setState({
            ...state,
            sampleRequests: [...state.sampleRequests, {language: '', requestBody: '', index: state.sampleRequests.length + 1}]
        })
    }

    const addResponseField = () => {
        setState({
            ...state,
            responseFields: [...state.responseFields, {name: '', type: '', description: '', index: state.responseFields.length + 1}]
        })
    }

    const removeQueryItem = (index) => () => {
        let toEdit = [...state.queryParams]
        toEdit.splice(index, 1)
        setState({
            ...state,
            queryParams: toEdit
        })
    }

    const removeRequestItem = (index) => () => {
        let toEdit = [...state.sampleRequests]
        toEdit.splice(index, 1)
        setState({
            ...state,
            sampleRequests: toEdit
        })
    }


    const removeFieldItem = (index) => () => {
        let toEdit = [...state.responseFields]
        toEdit.splice(index, 1)
        setState({
            ...state,
            responseFields: toEdit
        })
    }

    return (
        <Dialog open={props.open} fullScreen={fullScreen}>
            <DialogTitle>{CREATE_SERVICE_TITLE}</DialogTitle>
            <DialogContent>
                <DialogContentText>{CREATE_SERVICE_DESCRIPTION}</DialogContentText>
                <TextField
                    margin="dense"
                    variant="outlined"
                    label="Name"
                    name="name"
                    value={state.name}
                    onChange={handleBasicChange}
                />
                <div style={{display: 'flex', marginBottom: '20px'}}>
                    <TextField
                        label="Path"
                        margin="dense"
                        name="path"
                        variant="outlined"
                        style={{marginRight: '10px'}}
                        value={state.path}
                        onChange={handleBasicChange}
                    />
                    <FormControl
                        margin="dense"
                        variant="outlined"
                        style={{minWidth: '100px'}}
                    >
                        <InputLabel>Method</InputLabel>
                        <Select
                            label="Method"
                            value={state.requestMethod}
                            name="requestMethod"
                            onChange={handleBasicChange}
                        >
                            {REQUEST_METHODS.map(method => (
                                <MenuItem value={method}>{method}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <Typography variant="h6" component="div" gutterBottom>
                        Query Parameters
                    </Typography>
                    {state.queryParams.map((query, index) => (
                        <div>
                            <div style={{display: 'flex'}}>
                                <TextField
                                    label="Name"
                                    margin="dense"
                                    name="name"
                                    variant="outlined"
                                    style={{marginRight: '10px'}}
                                    value={query.name}
                                    onChange={(e) => handleComplexChange(e, index, 'queryParams')}
                                />
                                <FormControl
                                    margin="dense"
                                    variant="outlined"
                                    style={{minWidth: '100px'}}
                                >
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        value={query.type}
                                        name="type"
                                        onChange={(e) => handleComplexChange(e, index, 'queryParams')}
                                        label="Type"
                                    >
                                        {DATA_TYPES.map(type => (
                                            <MenuItem value={type}>{type}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <IconButton style={{marginTop: '5px', width: '40px'}} onClick={removeQueryItem(index)}>
                                    <Delete />
                                </IconButton>
                            </div>
                            <TextField
                                fullWidth
                                label="Description"
                                margin="dense"
                                name="description"
                                variant="outlined"
                                value={query.description}
                                onChange={(e) => handleComplexChange(e, index, 'queryParams')}
                            />
                        </div>
                    ))
                    }
                    <IconButton style={{width: '40px'}} onClick={addQueryParam}>
                        <Add />
                    </IconButton>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <Typography variant="h6" component="div" gutterBottom>
                        Sample Requests
                    </Typography>
                    {state.sampleRequests.map((request, index) => (
                        <div>
                            <div style={{display: 'flex'}}>
                                <TextField
                                    label="Language"
                                    margin="dense"
                                    name="language"
                                    variant="outlined"
                                    value={request.language}
                                    onChange={(e) => handleComplexChange(e, index, 'sampleRequests')}
                                />
                                <IconButton style={{marginTop: '5px', width: '40px'}} onClick={removeRequestItem(index)}>
                                    <Delete />
                                </IconButton>
                            </div>
                            <TextField
                                fullWidth
                                multiline
                                rows={5}
                                label="Request Body"
                                margin="dense"
                                name="requestBody"
                                variant="outlined"
                                value={request.requestBody}
                                onChange={(e) => handleComplexChange(e, index, 'sampleRequests')}
                            />
                        </div>
                    ))}
                    <IconButton style={{width: '40px'}} onClick={addSampleReq}>
                        <Add />
                    </IconButton>
                </div>
                <div style={{marginBottom: '20px'}}>
                    <Typography variant="h6" gutterBottom component="div">
                        Sample Response
                    </Typography>
                    <hr style={hrStyle}/>
                    <FormControl
                        margin="dense"
                        variant="outlined"
                        style={{width: '100px'}}
                    >
                        <InputLabel>Type</InputLabel>
                        <Select
                            value={state.sampleResponse.language}
                            name="language"
                            onChange={handleResponseChange}
                            label="Type"
                        >
                            <MenuItem value="json">json</MenuItem>
                            <MenuItem value="xml">xml</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        multiline
                        rows={10}
                        margin="dense"
                        variant="outlined"
                        label="Sample Response"
                        name="responseBody"
                        value={state.sampleResponse.responseBody}
                        onChange={handleResponseChange}
                    />
                </div>
                <div style={{marginBottom: '20px'}}>
                    <Typography variant="h6" component="div" gutterBottom>
                        Response Fields
                    </Typography>
                    {state.responseFields.map((response, index) => (
                        <div>
                            <div style={{display: 'flex'}}>
                                <TextField
                                    label="Name"
                                    margin="dense"
                                    name="name"
                                    variant="outlined"
                                    style={{marginRight: '10px'}}
                                    value={response.name}
                                    onChange={(e) => handleFieldChange(e, index)}
                                />
                                <FormControl
                                    margin="dense"
                                    variant="outlined"
                                    style={{minWidth: '100px'}}
                                >
                                    <InputLabel>Type</InputLabel>
                                    <Select
                                        value={response.type}
                                        name="type"
                                        onChange={(e) => handleFieldChange(e, index)}
                                        label="Type"
                                    >
                                        {DATA_TYPES.map(type => (
                                            <MenuItem value={type}>{type}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <IconButton style={{marginTop: '5px', width: '40px'}} onClick={removeFieldItem(index)}>
                                    <Delete />
                                </IconButton>
                            </div>
                            <TextField
                                fullWidth
                                label="Description"
                                margin="dense"
                                name="description"
                                variant="outlined"
                                value={response.description}
                                onChange={(e) => handleFieldChange(e, index)}
                            />
                        </div>
                    ))
                    }
                    <IconButton style={{width: '40px'}} onClick={addResponseField}>
                        <Add />
                    </IconButton>
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

export default CreateServiceDialog;