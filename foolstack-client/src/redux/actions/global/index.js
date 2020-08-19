import {
    REQUEST_STATUS,
    SET_LOADING_STATUS,
    SET_OPEN,
    CLEAR_STATUS
} from "../../constants/global";

export const requestStatus = (status) => ({
    type: REQUEST_STATUS,
    status,
});

export const setLoadingStatus = (loading) => ({
    type: SET_LOADING_STATUS,
    loading,
});

export const setOpen = (open) => ({
    type: SET_OPEN,
    open,
});

export const clearStatus = () => ({
    type: CLEAR_STATUS
})