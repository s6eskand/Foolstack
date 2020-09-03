import React, {useEffect, useState} from 'react';

// custom components
import ProjectSideNav from "./ProjectSideNav";
import ProjectCode from "./code/ProjectCode";
import CreateReadmeDialog from "./actions/CreateReadmeDialog";
import CodeFileDialog from "./actions/CodeFileDialog";
import ProjectToolbar from "./ProjectToolbar";
import ProjectSchema from "./schemas/ProjectSchema";
import SchemaDialog from "./actions/SchemaDialog";

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
    createOrEditSchema,
} from "../../redux/actions/project";

function ProjectView(props) {
    const isMobile = useMediaQuery('(max-width:760px)');
    const [state, setState] = useState({
        openSideNav: true,
        value: 0,
        isCreateReadmeDialogOpen: false,
        isCodeFileDialogOpen: false,
        isSchemaDialogOpen: false,
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

    const handleSchemaDialogOpen = () => {
        setState({
            ...state,
            isSchemaDialogOpen: true,
        })
    }

    const handleSchemaDialogClose = () => {
        setState({
            ...state,
            isSchemaDialogOpen: false
        })
    }

    const handleTabChange = (e, newValue) => {
        setState({
            ...state,
            value: newValue
        })
    }

    const handleToggleSideNav = () => {
        setState({
            ...state,
            openSideNav: !state.openSideNav
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
            <SchemaDialog
                owner={props.project.owner}
                projectTitle={props.project.projectTitle}
                handleClose={handleSchemaDialogClose}
                open={state.isSchemaDialogOpen}
                createSchema={props.createOrEditSchema}
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
                    handleToggleSideNav={handleToggleSideNav}
                    user={props.userInfo}
                    openSideNav={state.openSideNav}
                    isMobile={isMobile}
                    project={props.project}
                    canEdit={props.canEdit}
                    handleCodeFileOpen={handleCodeFileDialogOpen}
                    handleCreateReadmeOpen={handleCreateReadmeDialogOpen}
                    handleSchemaOpen={handleSchemaDialogOpen}
                />
            </div>
            <ProjectCode
                createReadme={props.createReadme}
                user={props.userInfo}
                marginLeft={state.openSideNav ? '170px' : '10px'}
                index={0}
                value={state.value}
                project={props.project}
                handleCodeFileDialogClose={handleCodeFileDialogClose}
                editCode={props.editCodeFile}
                handleReadMeClose={handleCreateReadmeDialogClose}
                handleReadMeOpen={handleCreateReadmeDialogOpen}
                isReadMeOpen={state.isCreateReadmeDialogOpen}
            />
            <ProjectSchema
                user={props.userInfo}
                marginLeft={state.openSideNav ? '170px' : '10px'}
                index={1}
                value={state.value}
                project={props.project}
                createSchema={props.createOrEditSchema}
                handleSchemaOpen={handleSchemaDialogOpen}
                handleSchemaClose={handleSchemaDialogClose}
                isSchemaDialogOpen={state.isSchemaDialogOpen}
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
    createOrEditSchema,
};

export default withShipment({
    mapStateToProps,
    actionCreators,
}, ProjectView)