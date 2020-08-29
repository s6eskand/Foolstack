import {
    STORE_SEARCH_RESULTS,
    SEARCH_LOADING,
} from "../../constants/project";

const initialState = {
    searchResults: [],
    isSearchLoading: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SEARCH_LOADING:
            return {
                ...state,
                isSearchLoading: action.isSearchLoading,
            }
        case STORE_SEARCH_RESULTS:
            return {
                ...state,
                searchResults: action.searchResults
            }
        default:
            return state
    }
}