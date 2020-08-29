import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REGISTER,
    STORE_TOKEN,
    STORE_USER,
} from "../../constants/auth";

export const authLogin = (loginData, close) => ({
    type: AUTH_LOGIN,
    loginData,
    close,
});

export const authLogout = () => ({
    type: AUTH_LOGOUT
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