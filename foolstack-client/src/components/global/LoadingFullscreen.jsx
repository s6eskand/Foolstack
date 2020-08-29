import React from 'react';

// material components
import {
    Dialog,
    CircularProgress
} from "@material-ui/core";

function LoadingFullscreen(props) {
    return(
        <Dialog open={props.loading}
            PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    overflow: 'hidden'
                }
            }}
        >
            <CircularProgress />
        </Dialog>
    )
}

export default LoadingFullscreen;