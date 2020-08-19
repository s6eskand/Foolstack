import {
    AUTH_LOGIN,
    AUTH_LOGOUT,
    AUTH_REGISTER,
    STORE_TOKEN,
    STORE_USER,
} from "../../constants/auth";

export const authLogin = (loginData, history) => ({
    type: AUTH_LOGIN,
    loginData,
    history,
});

export const authLogout = () => ({
    type: AUTH_LOGOUT
});

export const authRegister = (registerInfo, history) => ({
    type: AUTH_REGISTER,
    registerInfo,
    history,
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