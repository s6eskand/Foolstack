import React from 'react';

// material components
import {
    Alert
} from "@material-ui/lab";
import {
    Snackbar
} from "@material-ui/core";

function Alert(props) {

    const handleDialogClose = () => {
        props.handleClose()
    }

    return (
        <Snackbar
            open={props.open}
            autoHideDuration={6000}
            onClose={handleDialogClose}
            anchorOrigin={{vertical: 'top', horizontal: 'center'}}
        >
            <Alert variant="filled" onClose={handleDialogClose} severity={props.severity}>
                {props.message}
            </Alert>
        </Snackbar>
    );
}

export default Alert