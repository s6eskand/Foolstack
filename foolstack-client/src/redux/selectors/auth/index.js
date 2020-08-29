import {
    createSelector
} from 'reselect';

export const tokenSelector = createSelector(state => state && state.auth && state.auth.token, tokenSelector => tokenSelector);
export const isAuthenticatedSelector = createSelector(state => state && state.auth && state.auth.isAuthenticated, isAuthenticatedSelector => isAuthenticatedSelector);
export const userInfoSelector = createSelector(state => state && state.auth && state.auth.userInfo, userInfoSelector => userInfoSelector);
