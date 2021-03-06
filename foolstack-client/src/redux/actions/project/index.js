import {
    STORE_SEARCH_RESULTS,
    SEARCH_LOADING,
    SEARCH_USERS,
    GET_GITHUB_REPOS,
    STORE_GITHUB_REPOS,
    CREATE_PROJECT,
    LIST_ALL_PROJECTS,
    STORE_ALL_PROJECTS,
    CREATE_README,
    UPDATE_PROJECTS,
    CREATE_CODE_FILE,
    EDIT_CODE_FILE,
    CREATE_OR_EDIT_SCHEMA,
    DELETE_SCHEMA,
    CREATE_OR_EDIT_SERVICE,
    DELETE_CODE_FILE,
    DELETE_PROJECT,
    UPDATE_PROJECTS_AFTER_DELETE, DELETE_SERVICE,
} from "../../constants/project";

export const searchUsers = (searchValue) => ({
    type: SEARCH_USERS,
    searchValue,
});

export const searchLoading = (isSearchLoading) => ({
    type: SEARCH_LOADING,
    isSearchLoading,
});

export const storeSearchResults = (searchResults) => ({
    type: STORE_SEARCH_RESULTS,
    searchResults,
});

export const getGithubRepos = (githubUsername) => ({
    type: GET_GITHUB_REPOS,
    githubUsername,
});

export const storeGithubRepos = (githubRepos) => ({
    type: STORE_GITHUB_REPOS,
    githubRepos,
});

export const createProject = (project, refresh, history) => ({
    type: CREATE_PROJECT,
    project,
    refresh,
    history,
});

export const listAllProjects = () => ({
    type: LIST_ALL_PROJECTS,
});

export const storeAllProjects = (projects) => ({
    type: STORE_ALL_PROJECTS,
    projects,
});

export const createReadme = (readme, close) => ({
    type: CREATE_README,
    readme,
    close,
});

export const updateProjects = (project) => ({
    type: UPDATE_PROJECTS,
    project,
});

export const createCodeFile = (file, close) => ({
    type: CREATE_CODE_FILE,
    file,
    close,
});

export const editCodeFile = (file, close) => ({
    type: EDIT_CODE_FILE,
    file,
    close,
});

export const createOrEditSchema = (schema, close) => ({
    type: CREATE_OR_EDIT_SCHEMA,
    schema,
    close,
});

export const deleteSchema = (schema, reload) => ({
    type: DELETE_SCHEMA,
    schema,
    reload,
});

export const createOrEditService = (service, close) => ({
    type: CREATE_OR_EDIT_SERVICE,
    service,
    close,
});

export const deleteService = (service, reload) => ({
    type: DELETE_SERVICE,
    service,
    reload,
})

export const deleteCodeFile = (file, reload) => ({
    type: DELETE_CODE_FILE,
    file,
    reload,
});

export const deleteProject = (project, reload) => ({
    type: DELETE_PROJECT,
    project,
    reload,
});

export const updateProjectsAfterDelete = (project) => ({
    type: UPDATE_PROJECTS_AFTER_DELETE,
    project,
});