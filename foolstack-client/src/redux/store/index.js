import {
    createStore,
    applyMiddleware,
    compose,
} from "redux";
import {
    persistStore
} from 'redux-persist';
import createSagasMiddleware from 'redux-saga';

import rootReducer from '../reducers';
import registerSagas from '../sagas';

const storeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagasMiddleware = createSagasMiddleware();
const middleware = [
    sagasMiddleware,
];

export const store = createStore(rootReducer, storeEnhancer(applyMiddleware(...middleware)));
export const persistor = persistStore(store);

registerSagas(sagasMiddleware);