import {
    takeLatest,
    call,
    put
} from 'redux-saga/effects';
import axios from 'axios';

// constants for actions
import {
    CREATE_PROJECT,
    GET_GITHUB_REPOS,
    SEARCH_USERS,
} from "../../constants/project";

// server endpoints
import {
    SERVER_ENDPOINTS
} from "../../../components/global/constants";

// secondary actions
import {
    searchLoading, storeGithubRepos,
    storeSearchResults,
} from "../../actions/project";
import {requestStatus, setLoadingStatus} from "../../actions/global";
import {
    storeUser
} from "../../actions/auth";

function* postAuthRequest(endpoint, data) {
    return yield axios.post(endpoint, data, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(response => response);
}

function* getAuthRequest(endpoint) {
    return yield axios.get(endpoint, {
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
    })
        .then(response => response)
}

function* searchUsers(action) {
    // set loading to true on start of action
    yield put(searchLoading(true));
    // make request
    try {
        const response = yield call(() => postAuthRequest(SERVER_ENDPOINTS.SEARCH_USERS, {searchValue: action.searchValue}));
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

function* getGithubRepos(action) {
    // make request
    try {
        const response = yield call(() => getAuthRequest(SERVER_ENDPOINTS.GET_GITHUB_REPOS + action.githubUsername));
        if (response.status === 200) {
            yield put(storeGithubRepos(response.data))
        }
    } catch {
        yield put(storeGithubRepos([]))
    }
}

function* createProject(action) {
    yield put(setLoadingStatus(true));
    try {
        const response = yield call(() => postAuthRequest(SERVER_ENDPOINTS.CREATE_PROJECT, action.project));
        if (response.data['Error']) {
            yield put(setLoadingStatus(false))
            const status = {
                status: 400,
                statusText: response.data['Error'],
                success: false
            }
            yield put(requestStatus(status))
        } else {
            const getUserResponse = yield call(() => postAuthRequest(SERVER_ENDPOINTS.GET_USER, {username: action.project.username}));
            yield put(storeUser(getUserResponse.data));
            yield action.refresh();
            yield action.history.push(`/${action.project.username}/${action.project.projectTitle}`);
        }

    } catch {
        yield put(setLoadingStatus(false))
        const status = {
            status: 400,
            statusText: 'Error creating project. Try again',
            success: false
        }
        yield put(requestStatus(status))
    }
}

export default function* projectSagas() {
    yield takeLatest(SEARCH_USERS, searchUsers);
    yield takeLatest(GET_GITHUB_REPOS, getGithubRepos);
    yield takeLatest(CREATE_PROJECT, createProject);
}