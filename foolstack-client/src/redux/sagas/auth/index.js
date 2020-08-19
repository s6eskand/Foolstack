import {
    put,
    call,
    takeLatest
} from 'redux-saga/effects';
import axios from 'axios';

// constants
import {
    AUTH_LOGIN,
    AUTH_REGISTER,
    AUTH_LOGOUT
} from "../../constants/auth";

// actions
import {
    storeUser,
    storeToken
} from "../../actions/auth";
import {
    requestStatus,
    setLoadingStatus,
    setOpen,
    clearStatus
} from "../../actions/global";

function* postRequest(endpoint, data) {
    return yield axios.post(endpoint, data, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(response => response)
}

function* authLogin(action) {
    yield call(clearStatus);
    yield put(setLoadingStatus(true));
    const loginResponse = yield call(() => postRequest('http://localhost:8080/api/login', action.loginData));
    let userResponse;
    if (loginResponse.status === 200) {
        localStorage.setItem('token', loginResponse.data.access_token);
        yield put(storeToken(loginResponse.data.access_token, true));
        const request = {username: loginResponse.data.username}
        userResponse = yield call(() => postRequest('http://localhost:8080/account/getUser', request))
        if (userResponse.status === 200) {
            yield put(storeUser(userResponse.data))
        }
    }
    const status = {
        status: userResponse.status,
        statusText: userResponse.statusText,
        success: userResponse.status === 200,
    }
    yield put(requestStatus(status))
    yield put(setLoadingStatus(false))
    yield put(setOpen(true))
}

function* authRegister(action) {
    yield call(clearStatus);
    yield put(setLoadingStatus(true));
    const registerResponse = yield call(() => postRequest('http://localhost:8080/register/save', action.registerInfo))
    if (registerResponse.status === 200) {
        const userAction = {
            type: AUTH_LOGIN,
            loginData: {
                username: action.registerInfo.username,
                password: action.registerInfo.password,
            },
            history: action.history
        }
        yield call(() => authLogin(userAction))
    } else {
        const status = {
            status: registerResponse.status,
            statusText: registerResponse.statusText,
            success: registerResponse.status === 200,
        }
        yield put(requestStatus(status))
        yield put(setLoadingStatus(false))
        yield put(setOpen(true))
    }
}

export default function* authSagas() {
    yield takeLatest(AUTH_LOGIN, authLogin);
    yield takeLatest(AUTH_REGISTER, authRegister);
}