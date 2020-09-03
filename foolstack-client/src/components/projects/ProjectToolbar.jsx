import React, {useEffect, useState} from 'react';
import {
    Avatar,
    IconButton,
    ListItem,
    ListItemIcon,
    ListItemText,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography
} from "@material-ui/core";
import {
    AccountTree,
    AddCircle,
    ErrorOutline,
    History,
    Menu as MenuIcon,
    MergeType,
    Schedule,
    Warning
} from "@material-ui/icons";
import {ADD_CONTENT_TITLE, COMMIT_TITLE, ISSUE_TITLE, PULL_REQUEST_TITLE} from "./constants";

function ProjectToolbar(props) {
    const [state, setState] = useState({
        openSideNav: true,
        anchorEl: null,
        isCommitMenuOpen: false,
        isIssueMenuOpen: false,
        isPullRequestMenuOpen: false,
        isActionsMenuOpen: false,
    })

    useEffect(() => {
        setState({
            ...state,
            openSideNav: !props.isMobile
        })
    }, [props.isMobile])

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
            <MenuItem onClick={props.handleCreateReadmeOpen} disabled={props.project.readMe ? props.project.readMe.length > 0 : false}>Create project readme</MenuItem>
            <MenuItem onClick={props.handleCodeFileOpen}>Add code file</MenuItem>
            <MenuItem>Add service/api endpoint</MenuItem>
            <MenuItem>Add database schema</MenuItem>
            <MenuItem>Add documentation file</MenuItem>
        </Menu>
    )

    return (
        <div style={Object.keys(props.user).length > 0 ? {marginTop: '77px'} : null}>
        <Toolbar style={{
            backgroundColor: '#FED893',
        }}>
            <div style={{marginLeft: state.openSideNav ? '170px' : '100px', display: props.isMobile ? '' : 'flex'}}>
                <div style={{display: 'flex'}}>
                    <IconButton style={{width: '40px'}} onClick={handleToggleSideNav}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" style={{marginTop: '3px', marginRight: '10px'}}>
                        {props.project.owner}/{props.project.projectTitle}
                    </Typography>
                </div>
                <Tooltip title={ISSUE_TITLE} arrow>
                    <IconButton onClick={handleIssueMenuOpen} disabled={!props.project.linkIssues} style={{width: '40px'}}>
                        <ErrorOutline />
                    </IconButton>
                </Tooltip>
                <Tooltip title={COMMIT_TITLE} arrow>
                    <IconButton onClick={handleCommitMenuOpen} disabled={!props.project.linkCommits} style={{width: '40px'}}>
                        <History />
                    </IconButton>
                </Tooltip>
                <Tooltip title={PULL_REQUEST_TITLE} arrow>
                    <IconButton onClick={handlePullRequestMenuOpen} disabled={!props.project.linkPullRequests} style={{width: '40px'}}>
                        <AccountTree />
                    </IconButton>
                </Tooltip>
                {props.canEdit ?
                    <Tooltip title={ADD_CONTENT_TITLE} arrow>
                        <IconButton onClick={handleActionsMenuOpen} style={{width: '40px'}}>
                            <AddCircle />
                        </IconButton>
                    </Tooltip>
                    :
                    null
                }
            </div>
        </Toolbar>
        {displayIssueMenu}
        {displayCommitMenu}
        {displayPullRequestMenu}
        {displayActionsMenu}
        </div>
    )
}

export default ProjectToolbar;