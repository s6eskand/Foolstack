import React, {useEffect, useState} from 'react';

// material components
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    useMediaQuery
} from "@material-ui/core";

// material icons
import {
    Edit
} from "@material-ui/icons";

// constants
import {
    BITBUCKET_USERNAME,
    CANCEL,
    EDIT_PROFILE_DESCRIPTION,
    EDIT_PROFILE_TITLE, GITHUB_USERNAME,
    SAVE,
} from "./constants";

// styling
import styles from './EditProfile.module.css';
import LoadingFullscreen from "../global/LoadingFullscreen";
import AlertPopup from "../global/alerts/AlertPopup";
import {ERROR, SUCCESS} from "../global/constants";

function EditProfile(props) {
    const fullScreen = useMediaQuery('(max-width: 760px)')
    const maxLength = 220;
    const [state, setState] = useState({
        profilePicture: '',
        biography: '',
        websiteLink: '',
        socialLink: '',
        githubUsername: '',
    });

    useEffect(() => {
        setState({
            profilePicture: props.user.profilePicture,
            biography: props.user.biography ? props.user.biography : '',
            websiteLink: props.user.websiteLink,
            socialLink: props.user.socialLink,
            githubUsername: props.user.githubUsername,
        })
    }, [props.user])

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const setProfilePicture = async (e) => {
        const file = e.target.files[0];
        const base64string = await toBase64(file);
        setState({
            ...state,
            profilePicture: base64string
        })
    }

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = (e) => {
        e.preventDefault();

        const data = {
            username: props.user.username,
            biography: state.biography,
            profilePicture: state.profilePicture,
            githubUsername: state.githubUsername,
            websiteLink: state.websiteLink,
            socialLink: state.socialLink
        }

        props.editAccount(data, props.handleClose)

    }

    return (
        <>
        <LoadingFullscreen
            loading={props.loading}
        />
        <AlertPopup
            open={props.alertOpen}
            handleClose={props.handleAlertClose}
            message={props.requestStatus ? props.requestStatus.statusText : {}}
            severity={props.requestStatus ? props.requestStatus.success ? SUCCESS : ERROR : {}}
        />
        <Dialog open={props.open} maxWidth="lg" fullScreen={fullScreen}>
            <DialogTitle>{EDIT_PROFILE_TITLE}</DialogTitle>
            <DialogContent>
                <DialogContentText>{EDIT_PROFILE_DESCRIPTION}</DialogContentText>
                <div className={styles.rowSpec}>
                    <div className={styles.imageUpload}>
                        <img
                            className={styles.image}
                            src={state.profilePicture}
                            alt=""
                        />
                        <div className={styles.imageOverlay}>
                            <label
                                htmlFor="image"
                                style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center'
                                }}
                            >
                                <Edit />
                                Change Avatar
                            </label>
                            <input
                                style={{display: 'none'}}
                                id="image"
                                type="file"
                                onChange={setProfilePicture}
                                accept="image/png, image/jpg, image/jpeg, image/jfif"
                            />
                        </div>
                    </div>
                    <div className={styles.oneLineInputs}>
                        <TextField
                            variant="outlined"
                            value={state.websiteLink}
                            label="Website Link"
                            onChange={handleChange}
                            name="websiteLink"
                            margin="dense"
                        />
                        <TextField
                            variant="outlined"
                            value={state.socialLink}
                            label="Social Link"
                            onChange={handleChange}
                            name="socialLink"
                            margin="dense"
                        />
                        <TextField
                            variant="outlined"
                            value={state.githubUsername}
                            label="Github Username"
                            onChange={handleChange}
                            name="githubUsername"
                            margin="dense"
                        />
                        <p style={{fontSize: '12px'}}>{GITHUB_USERNAME}</p>
                    </div>
                </div>
                <TextField
                    name="biography"
                    error={state.biography.length > maxLength}
                    value={state.biography}
                    label="Biography"
                    fullWidth
                    onChange={handleChange}
                    variant="outlined"
                    margin="dense"
                    rows={3}
                    multiline={true}
                />
                <p style={{fontSize: '12px'}}>
                    <span
                        style={state.biography.length > maxLength ? {color: 'red'} : null}
                    >
                        {state.biography.length}
                    </span> / {maxLength}
                </p>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={props.handleClose}
                    variant="outlined"
                    color="secondary"
                >
                    {CANCEL}
                </Button>
                <Button
                    disabled={state.biography.length > maxLength}
                    onClick={handleSave}
                    variant="contained"
                    style={{backgroundColor: '#4EB6C4'}}
                >
                    {SAVE}
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )

}

export default EditProfile;