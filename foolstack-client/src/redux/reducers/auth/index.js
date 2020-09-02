import {
    STORE_USER,
    STORE_TOKEN,
    SET_IS_AUTHENTICATED
} from "../../constants/auth";
import {
    AUTH_KEY
} from "../../constants/keys";
import storage from 'redux-persist/lib/storage';
import {persistReducer} from "redux-persist";

const initialState = {
    isAuthenticated: false,
    token: null,
    userInfo: {}
}

const auth = (state = initialState, action) => {
    switch (action.type) {
        case STORE_TOKEN:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated,
                token: action.token
            }
        case STORE_USER:
            return {
                ...state,
                userInfo: action.userInfo
            }
        case SET_IS_AUTHENTICATED:
            return {
                ...state,
                isAuthenticated: action.isAuthenticated
            }
        default:
            return state
    }
}

const config = {
    key: AUTH_KEY,
    storage: storage,
    whitelist: ['userInfo', 'isAuthenticated'],
};

export default persistReducer(config, auth)