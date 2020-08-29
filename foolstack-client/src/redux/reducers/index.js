import {
    combineReducers
} from "redux";

// reducers
import auth from './auth';
import global from './global';
import project from './project';

const rootReducer = combineReducers({
    auth,
    global,
    project,
});

export default rootReducer;