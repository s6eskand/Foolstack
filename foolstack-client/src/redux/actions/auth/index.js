import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REGISTER,
    STORE_TOKEN,
    STORE_USER,
    VALIDATE_USER,
    SET_IS_AUTHENTICATED, GET_USER, EDIT_ACCOUNT_INFO,
} from "../../constants/auth";

export const authLogin = (loginData, close) => ({
    type: AUTH_LOGIN,
    loginData,
    close,
});

export const authLogout = (history) => ({
    type: AUTH_LOGOUT,
    history,
});

export const authRegister = (registerInfo, close) => ({
    type: AUTH_REGISTER,
    registerInfo,
    close,
});

export const storeToken = (token, isAuthenticated) => ({
    type: STORE_TOKEN,
    token,
    isAuthenticated,
});

export const storeUser = (userInfo) => ({
    type: STORE_USER,
    userInfo,
});

export const validateUser = () => ({
    type: VALIDATE_USER,
});

export const setIsAuthenticated = (isAuthenticated) => ({
    type: SET_IS_AUTHENTICATED,
    isAuthenticated,
});

export const getUser = (user) => ({
    type: GET_USER,
    user,
});

export const editAccountInfo = (info, close) => ({
    type: EDIT_ACCOUNT_INFO,
    info,
    close,
});