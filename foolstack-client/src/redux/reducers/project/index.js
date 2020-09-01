import {
    STORE_SEARCH_RESULTS,
    SEARCH_LOADING, STORE_GITHUB_REPOS,
} from "../../constants/project";

const initialState = {
    searchResults: [],
    isSearchLoading: false,
    githubRepos: []
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
        case STORE_GITHUB_REPOS:
            return {
                ...state,
                githubRepos: action.githubRepos
            }
        default:
            return state
    }
}