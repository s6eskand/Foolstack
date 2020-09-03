import {
    STORE_SEARCH_RESULTS,
    SEARCH_LOADING,
    STORE_GITHUB_REPOS,
    STORE_ALL_PROJECTS, UPDATE_PROJECTS, UPDATE_PROJECTS_AFTER_DELETE,
} from "../../constants/project";
import {
    PROJECT_KEY
} from "../../constants/keys";
import storage from 'redux-persist/lib/storage';
import {persistReducer} from "redux-persist";

const initialState = {
    searchResults: [],
    isSearchLoading: false,
    githubRepos: [],
    projects: []
};

const updateProject = (project, projectList) => {
    let newList = [];
    for (let i = 0; i < projectList.length; i++) {
        if (project.projectTitle === projectList[i].projectTitle) {
            newList = [...newList, project]
        } else {
            newList = [...newList, projectList[i]]
        }
    }
    return newList
}

const updateAfterDelete = (project, projectList) => {
    let newList = [];
    for (let i = 0; i < projectList.length; i++) {
        if (project.projectTitle !== projectList[i].projectTitle) {
            newList = [...newList, projectList[i]]
        }
    }
    return newList
}

const project = (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_LOADING:
            return {
                ...state,
                isSearchLoading: action.isSearchLoading,
            }
        case STORE_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.searchResults
            }
        case STORE_GITHUB_REPOS:
            return {
                ...state,
                githubRepos: action.githubRepos
            }
        case STORE_ALL_PROJECTS:
            return {
                ...state,
                projects: action.projects
            }
        case UPDATE_PROJECTS:
            return {
                ...state,
                projects: updateProject(action.project, state.projects)
            }
        case UPDATE_PROJECTS_AFTER_DELETE:
            return {
                ...state,
                projects: updateAfterDelete(action.project, state.projects)
            }
        default:
            return state
    }
}

const config = {
    key: PROJECT_KEY,
    storage: storage,
    whitelist: ['projects']
}

export default persistReducer(config, project)