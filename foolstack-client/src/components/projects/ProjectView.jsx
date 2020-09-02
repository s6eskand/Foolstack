import React, {useEffect, useState} from 'react';

// custom components
import ProjectSideNav from "./ProjectSideNav";
import ProjectCode from "./code/ProjectCode";
import CreateReadmeDialog from "./actions/CreateReadmeDialog";
import CodeFileDialog from "./actions/CodeFileDialog";
import ProjectToolbar from "./ProjectToolbar";

// material components
import {
    Tooltip,
    Toolbar,
    IconButton,
    Typography,
    useMediaQuery,
    Menu,
    ListItemText,
    ListItem,
    MenuItem,
    Avatar,
    ListItemIcon,
} from "@material-ui/core";

// material icons
import {
    Schedule,
    Menu as MenuIcon,
    AddCircle,
    Warning,
    ErrorOutline,
    AccountTree,
    History,
    MergeType,
} from "@material-ui/icons";

// constants
import {
    PULL_REQUEST_TITLE,
    ISSUE_TITLE,
    COMMIT_TITLE, ADD_CONTENT_TITLE,
} from "./constants";

// redux
import withShipment from "../../withShipment";
import {userInfoSelector} from "../../redux/selectors/auth";
import {
    createReadme,
} from "../../redux/actions/project";

function ProjectView(props) {
    const isMobile = useMediaQuery('(max-width:760px)');
    const [state, setState] = useState({
        openSideNav: true,
        value: 0,
        anchorEl: null,
        isCommitMenuOpen: false,
        isIssueMenuOpen: false,
        isPullRequestMenuOpen: false,
        isActionsMenuOpen: false,
        isCreateReadmeDialogOpen: false,
        isCodeFileDialogOpen: false,
    })

    useEffect(() => {
        setState({
            ...state,
            openSideNav: !isMobile
        })
    }, [isMobile, props.project])

    const handleCreateReadmeDialogOpen = () => {
        setState({
            ...state,
            isCreateReadmeDialogOpen: true
        })
    }

    const handleCreateReadmeDialogClose = () => {
        setState({
            ...state,
            isCreateReadmeDialogOpen: false
        })
    }

    const handleCodeFileDialogOpen = () => {
        setState({
            ...state,
            isCodeFileDialogOpen: true
        })
    }

    const handleCodeFileDialogClose = () => {
        setState({
            ...state,
            isCodeFileDialogOpen: false
        })
    }

    const handleCommitMenuOpen = (e) => {
        setState({
            ...state,
            isCommitMenuOpen: true,
            anchorEl: e.currentTarget
        })
    }

    const handleIssueMenuOpen = (e) => {
        setState({
            ...state,
            isIssueMenuOpen: true,
            anchorEl: e.currentTarget
        })
    }

    const handlePullRequestMenuOpen = (e) => {
        setState({
            ...state,
            isPullRequestMenuOpen: true,
            anchorEl: e.currentTarget
        })
    }

    const handleCommitMenuClose = () => {
        setState({
            ...state,
            isCommitMenuOpen: false,
            anchorEl: null
        })
    }

    const handleIssueMenuClose = () => {
        setState({
            ...state,
            isIssueMenuOpen: false,
            anchorEl: null
        })
    }

    const handlePullRequestMenuClose = () => {
        setState({
            ...state,
            isPullRequestMenuOpen: false,
            anchorEl: null
        })
    }

    const handleActionsMenuOpen = (e) => {
        setState({
            ...state,
            isActionsMenuOpen: true,
            anchorEl: e.currentTarget
        })
    }

    const handleActionsMenuClose = () => {
        setState({
            ...state,
            isActionsMenuOpen: false,
            anchorEl: null
        })
    }

    const handleToggleSideNav = () => {
        setState({
            ...state,
            openSideNav: !state.openSideNav
        })
    }

    const handleTabChange = (e, newValue) => {
        setState({
            ...state,
            value: newValue
        })
    }

    const openUrl = (url) => () => {
        if (url) {
            window.open(url)
        }
    }

    const displayIssueMenu = (
        <Menu
            anchorEl={state.anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={state.isIssueMenuOpen}
            onClose={handleIssueMenuClose}
        >
            {props.project.issues.length > 0 ?
                props.project.issues.map(issue => (
                <ListItem style={{outline: 'none', cursor: 'pointer'}} onClick={openUrl(issue.githubUrl)}>
                    <ListItemIcon>
                        <Warning style={{color: issue.state === "open" ? 'green' : 'red'}} />
                    </ListItemIcon>
                    <ListItemText
                        primary={issue.issueTitle}
                        secondary={issue.raisedBy}
                    />
                    <ListItemIcon style={{marginLeft: '15px'}}>
                        <Tooltip title={
                            `Created at: ${issue.createdAt} \n Updated last: ${issue.lastUpdated}`
                        }>
                            <Schedule />
                        </Tooltip>
                    </ListItemIcon>
                </ListItem>
            ))
            :
            <MenuItem>No issues linked to project</MenuItem>
            }
        </Menu>
    )

    const displayCommitMenu = (
        <Menu
            anchorEl={state.anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={state.isCommitMenuOpen}
            onClose={handleCommitMenuClose}
        >
            {props.project.commits.map(commit => (
                <ListItem style={{outline: 'none', cursor: 'pointer'}} onClick={openUrl(commit.githubUrl)}>
                    <ListItemIcon>
                        <Avatar src={`${commit.avatar}`} />
                    </ListItemIcon>
                    <ListItemText
                        primary={commit.message}
                        secondary={commit.author}
                    />
                    <ListItemIcon style={{marginLeft: '15px'}}>
                        <Tooltip title={
                            `Made: ${commit.date}`
                        }>
                            <Schedule />
                        </Tooltip>
                    </ListItemIcon>
                </ListItem>
            ))}
        </Menu>
    )

    const displayPullRequestMenu = (
        <Menu
            anchorEl={state.anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={state.isPullRequestMenuOpen}
            onClose={handlePullRequestMenuClose}
        >
            {props.project.pullRequests.length > 0 ? props.project.pullRequests.map(pullRequest => (
                <ListItem style={{outline: 'none', cursor: 'pointer'}} onClick={openUrl(pullRequest.githubUrl)}>
                    <ListItemIcon>
                        <MergeType style={{color: pullRequest.state === "open" ? 'green' : 'red'}}  />
                    </ListItemIcon>
                    <ListItemText
                        primary={pullRequest.pullRequestTitle}
                        secondary={pullRequest.raisedBy}
                    />
                    <ListItemIcon style={{marginLeft: '15px'}}>
                        <Tooltip title={
                            `Created at: ${pullRequest.createdAt} \n Updated at: ${pullRequest.lastUpdated}`
                        }>
                            <Schedule />
                        </Tooltip>
                    </ListItemIcon>
                </ListItem>
            ))
            :
            <MenuItem>No pull requests linked to project</MenuItem>
            }
        </Menu>
    )

    const displayActionsMenu = (
        <Menu
            anchorEl={state.anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={state.isActionsMenuOpen}
            onClose={handleActionsMenuClose}
        >
            <MenuItem onClick={handleCreateReadmeDialogOpen} disabled={props.project.readMe ? props.project.readMe.length > 0 : false}>Create project readme</MenuItem>
            <MenuItem onClick={handleCodeFileDialogOpen}>Add code file</MenuItem>
            <MenuItem>Add service/api endpoint</MenuItem>
            <MenuItem>Add database schema</MenuItem>
            <MenuItem>Add documentation file</MenuItem>
        </Menu>
    )

    return (
        <>
            <CreateReadmeDialog
                owner={props.project.owner}
                projectTitle={props.project.projectTitle}
                open={state.isCreateReadmeDialogOpen}
                handleClose={handleCreateReadmeDialogClose}
                createReadme={props.createReadme}
            />
            {/*<CodeFileDialog*/}
            {/*    owner={props.project.owner}*/}
            {/*    projectTitle={props.project.projectTitle}*/}
            {/*    open={state.isCodeFileDialogOpen}*/}
            {/*    handleClose={handleCodeFileDialogClose}*/}
            {/*    languages={props.project.languages}*/}
            {/*/>*/}
        <div style={props.userInfo ? {marginTop: '77px'} : null}>
            <ProjectSideNav
                open={state.openSideNav}
                value={state.value}
                canEdit={props.canEdit}
                handleTabChange={handleTabChange}
            />
            <div>
                <ProjectToolbar
                    openSideNav={state.openSideNav}
                    isMobile={isMobile}
                    handleToggleSideNav={handleToggleSideNav}
                    owner={props.project.owner}
                    projectTitle={props.project.projectTitle}
                    handleIssueMenuOpen={handleIssueMenuOpen}
                    handleCommitMenuOpen={handleCommitMenuOpen}
                    handlePullRequestMenuOpen={handlePullRequestMenuOpen}
                    handleActionsMenuOpen={handleActionsMenuOpen}
                    linkCommits={props.project.linkCommits}
                    linkIssues={props.project.linkIssues}
                    linkPullRequests={props.project.linkPullRequests}
                    canEdit={props.canEdit}
                />
            </div>
            {/*<ProjectCode*/}
            {/*    marginLeft={state.openSideNav ? '170px' : '10px'}*/}
            {/*    index={0}*/}
            {/*    value={state.value}*/}
            {/*    project={props.project}*/}
            {/*/>*/}
            {displayIssueMenu}
            {displayCommitMenu}
            {displayPullRequestMenu}
            {displayActionsMenu}
        </div>
        </>
    )

}

const mapStateToProps = (state) => ({
    userInfo: userInfoSelector(state)
});

const actionCreators = {
    createReadme,
};

export default withShipment({
    mapStateToProps,
    actionCreators,
}, ProjectView)