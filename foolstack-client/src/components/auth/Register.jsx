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

// constants
import {
    REGISTER_TITLE,
    REGISTER_DESCRIPTION,
    CANCEL,
    HAS_ACCOUNT
} from "./constants";

// images
import logo from '../../media/images/logo-short-blue-resize.png';

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            firstname: '',
            lastname: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleLogin = (e) => {
    }

    render() {
        return (
            <div hidden={this.props.value !== this.props.index}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
                    <img style={{width: '100px'}} src={logo} alt="foolstack blue logo"/>
                </div>
                <DialogTitle id="form-dialog-title">{REGISTER_TITLE}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{REGISTER_DESCRIPTION}</DialogContentText>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="firstname"
                            label="First Name"
                            value={this.state.firstname}
                            onChange={this.handleChange}
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            name="lastname"
                            label="Last Name"
                            value={this.state.lastname}
                            onChange={this.handleChange}
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            name="email"
                            label="Email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            name="username"
                            label="Username"
                            value={this.state.username}
                            onChange={this.handleChange}
                            variant="outlined"
                        />
                        <TextField
                            margin="dense"
                            name="password"
                            label="Password"
                            type="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            variant="outlined"
                        />
                    </div>
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
                    <Button style={{backgroundColor: '#4EB6C4', color: '#FFF'}} onClick={this.handleLogin} variant="contained">
                        {REGISTER_TITLE}
                    </Button>
                </DialogActions>
            </div>
        );
    }

}

export default Register;