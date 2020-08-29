import {
    takeLatest,
    call,
    put
} from 'redux-saga/effects';
import axios from 'axios';

// constants for actions
import {
    SEARCH_USERS,
} from "../../constants/project";

// server endpoints
import {
    SERVER_ENDPOINTS
} from "../../../components/global/constants";

// secondary actions
import {
    searchLoading,
    storeSearchResults,
} from "../../actions/project";

function* postRequest(endpoint, data) {
    return yield axios.post(endpoint, data, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(response => response);
}

function* searchUsers(action) {
    // set loading to true on start of action
    yield put(searchLoading(true));
    // make request
    try {
        const response = yield call(() => postRequest(SERVER_ENDPOINTS.SEARCH_USERS, {searchValue: action.searchValue}));
        // check if response successful
        if (response.status === 200) {
            yield put(storeSearchResults(response.data))
        } else {
            yield put(storeSearchResults([]))
        }
    } catch {
        yield put(storeSearchResults([]))
    }
    yield put(searchLoading(false))
}

export default function* projectSagas() {
    yield takeLatest(SEARCH_USERS, searchUsers);
}