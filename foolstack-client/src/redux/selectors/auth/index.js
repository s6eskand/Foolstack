import {
    createSelector
} from 'reselect';

export const tokenSelector = createSelector(state => state && state.auth && state.auth.token, tokenSelector => tokenSelector);
export const authenticatedSelector = createSelector(state => state && state.auth && state.auth.isAuthenticated, authenticatedSelector => authenticatedSelector);
export const userInfoSelector = createSelector(state => state && state.auth && state.auth.userInfo, userInfoSelector => userInfoSelector);
