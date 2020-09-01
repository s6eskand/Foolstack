import {
    createSelector
} from 'reselect';

export const isSearchLoadingSelector = createSelector(state => state && state.project && state.project.isSearchLoading, isSearchLoadingSelector => isSearchLoadingSelector);
export const searchResultsSelector = createSelector(state => state && state.project && state.project.searchResults, searchResultsSelector => searchResultsSelector);
export const githubReposSelector = createSelector(state => state && state.project && state.project.githubRepos, githubReposSelector => githubReposSelector);
