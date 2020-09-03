import {
    combineReducers
} from "redux";

// reducers
import auth from './auth';
import global from './global';
import project from './project';
import account from './account';

const rootReducer = combineReducers({
    auth,
    global,
    project,
    account,
});

export default rootReducer;