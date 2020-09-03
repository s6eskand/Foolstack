import {
    LIST_ALL_USERS,
    STORE_ALL_USERS,
} from "../../constants/account";

export const listAllUsers = () => ({
    type: LIST_ALL_USERS,
});

export const storeAllUsers = (users) => ({
    type: STORE_ALL_USERS,
    users,
})
