import {
    combineReducers
} from "redux";

// reducers
import auth from './auth';
import global from './global';

const rootReducer = combineReducers({
    auth,
    global,
});

export default rootReducer;