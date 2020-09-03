import React, {useEffect} from 'react';

import {useParams} from 'react-router-dom';

import ProjectView from "./ProjectView";
import NotFound from "../../base/NotFound";

// redux
import withShipment from "../../withShipment";
import {
    listAllProjects
} from "../../redux/actions/project";
import {
    projectsSelector
} from "../../redux/selectors/project";
import {
    userInfoSelector
} from "../../redux/selectors/auth";

function ViewableProject(props) {
    const { projectTitle } = useParams();

    useEffect(() => {
        props.listAllProjects();
    }, []);

    const findProjectIndex = (projects) => {
        if (projects) {
            return projects.findIndex(project => project.projectTitle === projectTitle)
        }
    }

    const filterProjects = (projects) => {
        if (props.userInfo) {
            return [...projects.filter(project => !project.isPrivate || project.canEdit.includes(props.userInfo.username))]
        } else {
            return [...projects.filter(project => !project.isPrivate)]
        }
    }

    const canEdit = (project) => {
        if (props.userInfo) {
            return project.canEdit.includes(props.userInfo.username)
        } else {
            return false
        }
    }

    if (findProjectIndex(filterProjects(props.projects)) === -1) {
        return <NotFound />
    } else {
        return (
            <ProjectView
                project={filterProjects(props.projects)[findProjectIndex(filterProjects(props.projects))]}
                canEdit={canEdit(filterProjects(props.projects)[findProjectIndex(filterProjects(props.projects))])}
            />
        )
    }

}

const mapStateToProps = (state) => ({
    projects: projectsSelector(state),
    userInfo: userInfoSelector(state),
});

const actionCreators = {
    listAllProjects,
}

export default withShipment({
    mapStateToProps,
    actionCreators,
}, ViewableProject)