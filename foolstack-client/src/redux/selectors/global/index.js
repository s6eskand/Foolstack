import {
    createSelector
} from 'reselect';

export const requestStatusSelector = createSelector(state => state && state.global && state.global.status, requestStatusSelector => requestStatusSelector);
export const loadingSelector = createSelector(state => state && state.global && state.global.loading, loadingSelector => loadingSelector);
export const openSelector = createSelector(state => state && state.global && state.global.open, openSelector => openSelector);
