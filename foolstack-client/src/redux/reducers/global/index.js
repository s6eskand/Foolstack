import {
    REQUEST_STATUS,
    SET_LOADING_STATUS,
    SET_OPEN,
    CLEAR_STATUS
} from "../../constants/global";

const initialState = {
    status: {},
    loading: false,
    open: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case REQUEST_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SET_LOADING_STATUS:
            return {
                ...state,
                loading: action.loading
            }
        case SET_OPEN:
            return {
                ...state,
                open: action.open
            }
        case CLEAR_STATUS:
            return {
                ...state,
                status: {}
            }
        default:
            return state
    }
}