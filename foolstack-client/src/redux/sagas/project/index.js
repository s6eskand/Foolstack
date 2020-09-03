import {
    takeLatest,
    call,
    put
} from 'redux-saga/effects';
import axios from 'axios';

// constants for actions
import {
    CREATE_CODE_FILE, CREATE_OR_EDIT_SCHEMA, CREATE_OR_EDIT_SERVICE,
    CREATE_PROJECT, CREATE_README, DELETE_CODE_FILE, DELETE_PROJECT, DELETE_SCHEMA, DELETE_SERVICE, EDIT_CODE_FILE,
    GET_GITHUB_REPOS, LIST_ALL_PROJECTS,
    SEARCH_USERS,
} from "../../constants/project";

// server endpoints
import {
    SERVER_ENDPOINTS
} from "../../../components/global/constants";

// secondary actions
import {
    searchLoading, storeAllProjects, storeGithubRepos,
    storeSearchResults, updateProjects, updateProjectsAfterDelete,
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

function* getNoAuthRequest(endpoint) {
    return yield axios.get(endpoint)
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
            yield action.history.push(`/projects/${response.data.projectTitle}`);
            yield action.refresh()
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

function* listAllProjects() {
    try {
        const response = yield call(() => getNoAuthRequest(SERVER_ENDPOINTS.LIST_ALL_PROJECTS));
        if (response.status === 200) {
            yield put(storeAllProjects(response.data))
        }
    } catch (e) {
        throw new Error(e)
    }
}

function* createReadme(action) {
    yield put(setLoadingStatus(true))
    try {
        const response = yield call(() => postAuthRequest(SERVER_ENDPOINTS.CREATE_README, action.readme));
        if (response.status === 200) {
            yield put(updateProjects(response.data))
            yield put(setLoadingStatus(false))
            yield action.close();
        }
    } catch (e) {
        yield put(setLoadingStatus(false))
        throw new Error(e)
    }
}

function* createCodeFile(action) {
    yield put(setLoadingStatus(true))
    try {
        const response = yield call(() => postAuthRequest(SERVER_ENDPOINTS.CREATE_CODE_FILE, action.file));
        if (response.status === 200) {
            yield put(updateProjects(response.data))
            yield put(setLoadingStatus(false))
            yield action.close();
        }
    } catch (e) {
        yield put(setLoadingStatus(false))
        throw new Error(e)
    }
}

function* editCodeFile(action) {
    yield put(setLoadingStatus(true))
    try {
        const response = yield call(() => postAuthRequest(SERVER_ENDPOINTS.EDIT_CODE_FILE, action.file));
        if (response.status === 200) {
            yield put(updateProjects(response.data))
            yield put(setLoadingStatus(false))
            yield action.close();
        }
    } catch (e) {
        yield put(setLoadingStatus(false))
        throw new Error(e)
    }
}

function* createOrEditSchema(action) {
    yield put(setLoadingStatus(true))
    try {
        const response = yield call(() => postAuthRequest(SERVER_ENDPOINTS.CREATE_OR_EDIT_SCHEMA, action.schema));
        if (response.status === 200) {
            yield put(updateProjects(response.data))
            yield put(setLoadingStatus(false))
            yield action.close();
        }
    } catch (e) {
        yield put(setLoadingStatus(false))
        throw new Error(e)
    }
}

function* deleteSchema(action) {
    yield put(setLoadingStatus(true))
    try {
        const response = yield call(() => postAuthRequest(SERVER_ENDPOINTS.DELETE_SCHEMA, action.schema));
        if (response.status === 200) {
            yield put(updateProjects(response.data))
            yield put(setLoadingStatus(false))
            yield action.reload()
        }
    } catch (e) {
        yield put(setLoadingStatus(false))
        throw new Error(e)
    }
    yield action.reload()
}

function* createOrEditService(action) {
    yield put(setLoadingStatus(true))
    try {
        const response = yield call(() => postAuthRequest(SERVER_ENDPOINTS.CREATE_OR_EDIT_SERVICE, action.service));
        if (response.status === 200) {
            yield put(updateProjects(response.data))
            yield put(setLoadingStatus(false))
            yield action.close();
        }
    } catch (e) {
        yield put(setLoadingStatus(false))
        throw new Error(e)
    }
}

function* deleteService(action) {
    yield put(setLoadingStatus(true))
    try {
        const response = yield call(() => postAuthRequest(SERVER_ENDPOINTS.DELETE_SERVICE, action.service));
        if (response.status === 200) {
            yield put(updateProjects(response.data))
            yield put(setLoadingStatus(false))
            yield action.reload()
        }
    } catch (e) {
        yield put(setLoadingStatus(false))
        throw new Error(e)
    }
    yield action.reload()
}

function* deleteCodeFile(action) {
    yield put(setLoadingStatus(true))
    try {
        const response = yield call(() => postAuthRequest(SERVER_ENDPOINTS.DELETE_CODE_FILE, action.file));
        if (response.status === 200) {
            yield put(updateProjects(response.data))
            yield put(setLoadingStatus(false))
            yield action.reload()
        }
    } catch (e) {
        yield put(setLoadingStatus(false))
        throw new Error(e)
    }
    yield action.reload()
}

function* deleteProject(action) {
    yield put(setLoadingStatus(true))
    try {
        const response = yield call(() => SERVER_ENDPOINTS.DELETE_PROJECT, action.project);
        if (response.status === 200) {
            yield put(updateProjectsAfterDelete(action.project));
            yield put(setLoadingStatus(false))
            yield action.reload()
        }
    } catch (e) {
        yield put(setLoadingStatus(false))
        throw new Error(e)
    }
    yield action.reload()
}

export default function* projectSagas() {
    yield takeLatest(SEARCH_USERS, searchUsers);
    yield takeLatest(GET_GITHUB_REPOS, getGithubRepos);
    yield takeLatest(CREATE_PROJECT, createProject);
    yield takeLatest(LIST_ALL_PROJECTS, listAllProjects);
    yield takeLatest(CREATE_README, createReadme);
    yield takeLatest(CREATE_CODE_FILE, createCodeFile);
    yield takeLatest(EDIT_CODE_FILE, editCodeFile);
    yield takeLatest(CREATE_OR_EDIT_SCHEMA, createOrEditSchema);
    yield takeLatest(DELETE_SCHEMA, deleteSchema);
    yield takeLatest(CREATE_OR_EDIT_SERVICE, createOrEditService);
    yield takeLatest(DELETE_CODE_FILE, deleteCodeFile);
    yield takeLatest(DELETE_PROJECT, deleteProject);
    yield takeLatest(DELETE_SERVICE, deleteService);
}