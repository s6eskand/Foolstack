import {
    STORE_SEARCH_RESULTS,
    SEARCH_LOADING,
    SEARCH_USERS,
} from "../../constants/project";

export const searchUsers = (searchValue) => ({
    type: SEARCH_USERS,
    searchValue,
});

export const searchLoading = (isSearchLoading) => ({
    type: SEARCH_LOADING,
    isSearchLoading,
});

export const storeSearchResults = (searchResults) => ({
    type: STORE_SEARCH_RESULTS,
    searchResults,
});