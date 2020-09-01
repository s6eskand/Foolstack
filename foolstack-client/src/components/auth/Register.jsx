import React from 'react';

// material components
import {
    DialogContent,
    DialogTitle,
    DialogContentText,
    TextField,
    DialogActions,
    Button
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

// constants
import {
    REGISTER_TITLE,
    REGISTER_DESCRIPTION,
    CANCEL,
    HAS_ACCOUNT, LOGIN_SUCCESS, LOGIN_ERROR
} from "./constants";

// images
import logo from '../../media/images/logo-short-blue-resize.png';
import {ERROR, SUCCESS} from "../global/constants";
import AlertPopup from "../global/alerts/AlertPopup";

import axios from 'axios'

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.whitelist = ['errors', 'submitMessage', 'submitError']
        this.state = {
            email: '',
            username: '',
            password: '',
            password2: '',
            firstname: '',
            lastname: '',
            submitError: false,
            errors: {
                email: false,
                username: false,
                password: false,
                password2: false,
                firstname: false,
                lastname: false
            },
            submitMessage: '',
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleRegister = async (e) => {
        e.preventDefault();

        const state = [...Object.keys(this.state)]
        let fields = {
            username: false,
            email: false,
            password: false,
            password2: false,
            firstname: false,
            lastname: false
        }
        let error = false

        state.map(key => {
            if (!this.whitelist.includes(key) && this.state[key].length === 0) {
                error = true;
                fields[key] = true
            }
        })

        if (error) {
            this.setState({
                submitError: true,
                errors: fields,
                submitMessage: 'Please fill out required fields.'
            })
        }

        if (this.state.password !== this.state.password2) {
            error = true;
            fields.password = true
            fields.password2 = true
            this.setState({
                submitError: true,
                errors: fields,
                submitMessage: "Your passwords do not match!"
            })
        }

        if (!error) {
            this.setState({
                submitError: false,
                submitMessage: ''
            })

            const registerInfo = {
                username: this.state.username,
                password: this.state.password,
                email: this.state.email,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
            }

            this.props.authRegister(registerInfo, this.props.handleClose)
        }
    }

    render() {
        return (
            <div hidden={this.props.value !== this.props.index}>
                <AlertPopup
                    open={this.props.open}
                    message={this.props.status.success ? LOGIN_SUCCESS : LOGIN_ERROR}
                    severity={this.props.status.success ? SUCCESS : ERROR}
                    handleClose={this.props.handleAlertClose}
                />
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
                    <img style={{width: '100px'}} src={logo} alt="foolstack blue logo"/>
                </div>
                <DialogTitle id="form-dialog-title">{REGISTER_TITLE}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{REGISTER_DESCRIPTION}</DialogContentText>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <TextField
                            error={this.state.errors.firstname}
                            autoFocus
                            margin="dense"
                            name="firstname"
                            label="First Name"
                            value={this.state.firstname}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                        />
                        <TextField
                            error={this.state.errors.lastname}
                            margin="dense"
                            name="lastname"
                            label="Last Name"
                            value={this.state.lastname}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                        />
                        <TextField
                            error={this.state.errors.email}
                            margin="dense"
                            name="email"
                            label="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                        />
                        <TextField
                            error={this.state.errors.username}
                            margin="dense"
                            name="username"
                            label="Username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                        />
                        <TextField
                            error={this.state.errors.password}
                            margin="dense"
                            name="password"
                            label="Password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                        />
                        <TextField
                            error={this.state.errors.password2}
                            margin="dense"
                            name="password2"
                            label="Password (again)"
                            type="password"
                            value={this.state.password2}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                        />
                    </div>
                    {this.state.submitError ? <Alert severity={"error"}>{this.state.submitMessage}</Alert> : null}
                </DialogContent>
                <DialogActions>
                    <Button onClick={(e) => this.props.handleTabChange(e, 0)} fullWidth>
                        {HAS_ACCOUNT}
                    </Button>
                </DialogActions>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="secondary">
                        {CANCEL}
                    </Button>
                    <Button style={{backgroundColor: '#4EB6C4', color: '#FFF'}} onClick={this.handleRegister} variant="contained">
                        {REGISTER_TITLE}
                    </Button>
                </DialogActions>
            </div>
        );
    }

}

export default Register;