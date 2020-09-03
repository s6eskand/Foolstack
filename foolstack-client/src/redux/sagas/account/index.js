import {
    put,
    call,
    takeLatest,
} from 'redux-saga/effects';
import axios from 'axios';

import {
    LIST_ALL_USERS
} from "../../constants/account";

// server endpoints
import {
    SERVER_ENDPOINTS
} from "../../../components/global/constants";

// secondary actions
import {
    storeAllUsers
} from "../../actions/account";

function* getNoAuthRequest(endpoint) {
    return yield axios.get(endpoint)
        .then(response => response)
}

function* listAllUsers() {
    try {
        const response = yield call(() => getNoAuthRequest(SERVER_ENDPOINTS.LIST_ALL_USERS))
        if (response.status === 200) {
            yield put(storeAllUsers(response.data))
        }
    } catch (e) {
        throw new Error(e)
    }
}

export default function* accountSagas() {
    yield takeLatest(LIST_ALL_USERS, listAllUsers);
}