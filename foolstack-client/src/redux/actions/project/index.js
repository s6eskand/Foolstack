import {
    STORE_SEARCH_RESULTS,
    SEARCH_LOADING,
    SEARCH_USERS,
    GET_GITHUB_REPOS,
    STORE_GITHUB_REPOS,
    CREATE_PROJECT, LIST_ALL_PROJECTS, STORE_ALL_PROJECTS, CREATE_README, UPDATE_PROJECTS,
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