
// sagas
import authSagas from "./auth";

const sagas = [
    authSagas,
];

const registerSagas = (middleware) => {
    sagas.map((saga) => {
        middleware.run(saga);
    });
};

export default registerSagas;