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
    LOGIN_TITLE,
    LOGIN_DESCRIPTION,
    CANCEL,
    CREATE_ACCOUNT,
    PASSWORD_RESET
} from "./constants";

// styling
import './Dialog.css';

// images
import logo from '../../media/images/logo-short-blue-resize.png';

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
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
            <div className="dialog-container" hidden={this.props.value !== this.props.index}>
                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px'}}>
                    <img style={{width: '100px'}} src={logo} alt="foolstack blue logo"/>
                </div>
                <DialogTitle id="form-dialog-title">{LOGIN_TITLE}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{LOGIN_DESCRIPTION}</DialogContentText>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <TextField
                            autoFocus
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
                    <Button color="primary" fullWidth>
                        {PASSWORD_RESET}
                    </Button>
                    <Button onClick={(e) => this.props.handleTabChange(e, 1)} fullWidth>
                        {CREATE_ACCOUNT}
                    </Button>
                </DialogActions>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="secondary">
                        {CANCEL}
                    </Button>
                    <Button style={{backgroundColor: '#4EB6C4', color: '#FFF'}} onClick={this.handleLogin} variant="contained">
                        {LOGIN_TITLE}
                    </Button>
                </DialogActions>
            </div>
        );
    }

}

export default Login