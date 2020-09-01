
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
    SEARCH_USERS: `${BASE_URL}/project/listUsers`,
    EDIT_PROFILE: `${BASE_URL}/account/edit`,
}