import {
    STORE_ALL_USERS
} from "../../constants/account";
import {
    ACCOUNT_KEY
} from "../../constants/keys";
import storage from 'redux-persist/lib/storage';
import {persistReducer} from "redux-persist";

const initialState = {
    users: []
};

const account = (state = initialState, action) => {
    switch (action.type) {
        case STORE_ALL_USERS:
            return {
                ...state,
                users: action.users
            }
        default:
            return state
    }
}

const config = {
    key: ACCOUNT_KEY,
    storage: storage,
    whitelist: ['users']
}

export default persistReducer(config, account);