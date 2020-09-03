
export const ERROR = "error";
export const SUCCESS = 'success';
export const WARNING = 'warning';
export const INFO = 'info';

const BASE_URL = 'http://localhost:8080'

export const SERVER_ENDPOINTS = {
    AUTH_LOGIN: `${BASE_URL}/api/login`,
    AUTH_REGISTER: `${BASE_URL}/register/save`,
    AUTH_LOGOUT: `${BASE_URL}/api/logout`,
    AUTH_VALIDATE: `${BASE_URL}/api/validate`,
    GET_USER: `${BASE_URL}/account/getUser`,
    SEARCH_USERS: `${BASE_URL}/account/search`,
    EDIT_PROFILE: `${BASE_URL}/account/edit`,
    LIST_ALL_USERS: `${BASE_URL}/account/list`,
    GET_GITHUB_REPOS: `${BASE_URL}/project/github?username=`,
    CREATE_PROJECT: `${BASE_URL}/project/create`,
    LIST_ALL_PROJECTS: `${BASE_URL}/project/list`,
    CREATE_README: `${BASE_URL}/project/readme`,
    CREATE_CODE_FILE: `${BASE_URL}/project/addCode`,
    EDIT_CODE_FILE: `${BASE_URL}/project/editCode`,
    CREATE_OR_EDIT_SCHEMA: `${BASE_URL}/project/schema`,
    DELETE_SCHEMA: `${BASE_URL}/project/deleteSchema`
}