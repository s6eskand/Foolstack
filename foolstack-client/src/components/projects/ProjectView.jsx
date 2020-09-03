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

// redux
import withShipment from "../../withShipment";
import {userInfoSelector} from "../../redux/selectors/auth";
import {
    createReadme,
    createCodeFile,
    editCodeFile,
} from "../../redux/actions/project";

function ProjectView(props) {
    const isMobile = useMediaQuery('(max-width:760px)');
    const [state, setState] = useState({
        openSideNav: true,
        value: 0,
        isCreateReadmeDialogOpen: false,
        isCodeFileDialogOpen: false,
    })

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

    const handleTabChange = (e, newValue) => {
        setState({
            ...state,
            value: newValue
        })
    }

    return (
        <>
            <CreateReadmeDialog
                owner={props.project.owner}
                projectTitle={props.project.projectTitle}
                open={state.isCreateReadmeDialogOpen}
                handleClose={handleCreateReadmeDialogClose}
                createReadme={props.createReadme}
            />
            <CodeFileDialog
                createCode={props.createCodeFile}
                owner={props.project.owner}
                projectTitle={props.project.projectTitle}
                open={state.isCodeFileDialogOpen}
                handleClose={handleCodeFileDialogClose}
                languages={props.project.languages}
            />
        <div>
            <ProjectSideNav
                open={state.openSideNav}
                value={state.value}
                canEdit={props.canEdit}
                handleTabChange={handleTabChange}
            />
            <div>
                <ProjectToolbar
                    user={props.userInfo}
                    openSideNav={state.openSideNav}
                    isMobile={isMobile}
                    project={props.project}
                    canEdit={props.canEdit}
                    handleCodeFileOpen={handleCodeFileDialogOpen}
                    handleCreateReadmeOpen={handleCreateReadmeDialogOpen}
                />
            </div>
            <ProjectCode
                marginLeft={state.openSideNav ? '170px' : '10px'}
                index={0}
                value={state.value}
                project={props.project}
                handleCodeFileDialogClose={handleCodeFileDialogClose}
                editCode={props.editCodeFile}
            />
        </div>
        </>
    )

}

const mapStateToProps = (state) => ({
    userInfo: userInfoSelector(state)
});

const actionCreators = {
    createReadme,
    createCodeFile,
    editCodeFile,
};

export default withShipment({
    mapStateToProps,
    actionCreators,
}, ProjectView)