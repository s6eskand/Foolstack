import React from 'react';
import {IconButton, Toolbar, Tooltip, Typography} from "@material-ui/core";
import {AccountTree, AddCircle, ErrorOutline, History, Menu as MenuIcon} from "@material-ui/icons";
import {ADD_CONTENT_TITLE, COMMIT_TITLE, ISSUE_TITLE, PULL_REQUEST_TITLE} from "./constants";

function ProjectToolbar(props) {
    return (
        <Toolbar style={{
            backgroundColor: '#FED893',
        }}>
            <div style={{marginLeft: props.openSideNav ? '170px' : '10px', display: props.isMobile ? '' : 'flex'}}>
                <div style={{display: 'flex'}}>
                    <IconButton style={{width: '40px'}} onClick={props.handleToggleSideNav}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" style={{marginTop: '3px', marginRight: '10px'}}>
                        {props.owner}/{props.projectTitle}
                    </Typography>
                </div>
                <Tooltip title={ISSUE_TITLE} arrow>
                    <IconButton onClick={props.handleIssueMenuOpen} disabled={!props.linkIssues} style={{width: '40px'}}>
                        <ErrorOutline />
                    </IconButton>
                </Tooltip>
                <Tooltip title={COMMIT_TITLE} arrow>
                    <IconButton onClick={props.handleCommitMenuOpen} disabled={!props.linkCommits} style={{width: '40px'}}>
                        <History />
                    </IconButton>
                </Tooltip>
                <Tooltip title={PULL_REQUEST_TITLE} arrow>
                    <IconButton onClick={props.handlePullRequestMenuOpen} disabled={!props.linkPullRequests} style={{width: '40px'}}>
                        <AccountTree />
                    </IconButton>
                </Tooltip>
                {props.canEdit ?
                    <Tooltip title={ADD_CONTENT_TITLE} arrow>
                        <IconButton onClick={props.handleActionsMenuOpen} style={{width: '40px'}}>
                            <AddCircle />
                        </IconButton>
                    </Tooltip>
                    :
                    null
                }
            </div>
        </Toolbar>
    )
}

export default ProjectToolbar;