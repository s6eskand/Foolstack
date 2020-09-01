import React, { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

// custom components
import LoadingFullscreen from "../../global/LoadingFullscreen";

// material components
import {
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    Button,
    TextField,
    FormControlLabel,
    FormControl,
    InputLabel,
    Checkbox,
    Select,
    MenuItem,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useMediaQuery,
} from "@material-ui/core";
import {Alert} from "@material-ui/lab";

// material icons
import {
    AccountTree,
    Lock
} from "@material-ui/icons";

// styling
import styles from './CreateProjectDialog.module.css';

// constants
import {
    CANCEL,
    CREATE,
    CREATE_PROJECT_DESCRIPTION,
    CREATE_PROJECT_TITLE, GITHUB_REPO_LABEL,
    LANGUAGES_HELP,
    PRIVATE,
    PRIVATE_HELP,
    PUBLIC,
    PUBLIC_HELP
} from "./constants";
import {ERROR} from "../../global/constants";

// redux
import withShipment from "../../../withShipment";
import {
    getGithubRepos,
    createProject,
} from "../../../redux/actions/project";
import {
    userInfoSelector
} from "../../../redux/selectors/auth";
import {
    githubReposSelector
} from "../../../redux/selectors/project";
import {
    loadingSelector,
    requestStatusSelector,
} from "../../../redux/selectors/global";

function CreateProjectDialog(props) {
    const history = useHistory();
    const fullScreen = useMediaQuery('(max-width:760px)');
    const [state, setState] = useState({
        projectTitle: '',
        projectDescription: '',
        languages: '',
        isPrivate: false,
        fromGithub: false,
        githubRepository: '',
        linkCommits: false,
        linkIssues: false,
        linkPullRequests: false,
    })
    const [initialState, ] = useState(state)

    useEffect(() => {
        props.getGithubRepos(props.userInfo.githubUsername);
    }, [])

    const handleClose = () => {
        setState(initialState)
        props.handleClose()
    }

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const handleCheck = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.checked
        })
    }

    const handlePrivateCheck = () => {
        setState({
            ...state,
            isPrivate: !state.isPrivate
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username: props.userInfo.username,
            projectTitle: state.projectTitle,
            projectDescription: state.projectDescription,
            fromGithub: state.fromGithub,
            githubRepository: state.githubRepository,
            linkCommits: state.linkCommits,
            linkIssues: state.linkIssues,
            linkPullRequests: state.linkPullRequests,
            languages: state.languages,
            isPrivate: state.isPrivate
        }

        props.createProject(data, () => window.location.reload(), history)
    }

    const displayAlert = () => {
        if (props.requestStatus) {
            if (props.requestStatus.success === false) {
                return (
                    <Alert severity={ERROR}>{props.requestStatus.statusText}</Alert>
                )
            }
        }

        return null;
    }

    const isDisabled = () => {
        if (!state.fromGithub && (state.languages.length === 0 || state.projectTitle.length === 0)) {
            return true;
        } else if (state.fromGithub && state.githubRepository.length === 0) {
            return true;
        } else {
            return false
        }
    }

    return (
        <>
        <LoadingFullscreen
            loading={props.loading}
        />
        <Dialog open={props.open} fullScreen={fullScreen}>
            <DialogTitle>{CREATE_PROJECT_TITLE}</DialogTitle>
            <DialogContent>
                <DialogContentText>{CREATE_PROJECT_DESCRIPTION}</DialogContentText>
                <div className={styles.rowCol}>
                    <TextField
                        disabled={state.fromGithub}
                        variant="outlined"
                        required
                        value={state.projectTitle}
                        name="projectTitle"
                        margin="dense"
                        onChange={handleChange}
                        label="Title (required)"
                    />
                    <TextField
                        disabled={state.fromGithub}
                        variant="outlined"
                        fullWidth
                        value={state.languages}
                        name="languages"
                        margin="dense"
                        onChange={handleChange}
                        label="Languages (comma separated)"
                    />
                    <p style={{fontSize: '12px'}}>{LANGUAGES_HELP}</p>
                    <TextField
                        disabled={state.fromGithub}
                        variant="outlined"
                        margin="dense"
                        fullWidth
                        value={state.projectDescription}
                        name="projectDescription"
                        onChange={handleChange}
                        label="Description"
                    />
                </div>
                <hr className={styles.divider} />
                <List component="div" className={styles.privateSelection}>
                    <div className={styles.rowSpec}>
                        <ListItem>
                            <ListItemIcon>
                                <AccountTree />
                            </ListItemIcon>
                            <ListItemText
                                primary={PUBLIC}
                                secondary={PUBLIC_HELP}
                            />
                        </ListItem>
                        <Checkbox checked={!state.isPrivate} onChange={handlePrivateCheck} />
                    </div>
                    <div className={styles.rowSpec}>
                        <ListItem>
                            <ListItemIcon>
                                <Lock />
                            </ListItemIcon>
                            <ListItemText
                                primary={PRIVATE}
                                secondary={PRIVATE_HELP}
                            />
                        </ListItem>
                        <Checkbox checked={state.isPrivate} onChange={handlePrivateCheck} />
                    </div>
                </List>
                <hr className={styles.divider} />
                <div className={styles.rowCol}>
                    <FormControlLabel
                        control={
                            <Checkbox checked={state.fromGithub} name="fromGithub" onChange={handleCheck} />
                        }
                        label="Import from Github"
                    />
                    {state.fromGithub ?
                        <>
                            <FormControl
                                variant="outlined"
                            >
                                <InputLabel>{GITHUB_REPO_LABEL}</InputLabel>
                                <Select
                                    label="Github Repo"
                                    value={state.githubRepository}
                                    name="githubRepository"
                                    onChange={handleChange}
                                >
                                    {props.githubRepos.map(repo => (
                                        <MenuItem value={repo}>{repo}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControlLabel
                                control={
                                    <Checkbox checked={state.linkCommits} name="linkCommits" onChange={handleCheck} />
                                }
                                label="Link Commits"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={state.linkIssues} name="linkIssues" onChange={handleCheck} />
                                }
                                label="Link Issues"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={state.linkPullRequests} name="linkPullRequests" onChange={handleCheck} />
                                }
                                label="Link Pull Requests"
                            />
                        </>
                        :
                        null
                    }
                </div>
            </DialogContent>
            {displayAlert()}
            <DialogActions>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleClose}
                >
                    {CANCEL}
                </Button>
                <Button
                    disabled={isDisabled()}
                    variant="contained"
                    style={{backgroundColor: '#4EB6C4'}}
                    onClick={handleSubmit}
                >
                    {CREATE}
                </Button>
            </DialogActions>
        </Dialog>
        </>
    )
}

const mapStateToProps = (state) => ({
    userInfo: userInfoSelector(state),
    githubRepos: githubReposSelector(state),
    loading: loadingSelector(state),
    requestStatus: requestStatusSelector(state),
});

const actionCreators = {
    getGithubRepos,
    createProject,
}

export default withShipment({
    mapStateToProps,
    actionCreators
}, CreateProjectDialog);