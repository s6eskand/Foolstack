import {
    createSelector
} from 'reselect';

export const usersSelector = createSelector(state => state && state.account && state.account.users, usersSelector => usersSelector);
