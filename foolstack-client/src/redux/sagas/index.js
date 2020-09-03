
// sagas
import authSagas from "./auth";
import projectSagas from "./project";
import accountSagas from "./account";

const sagas = [
    authSagas,
    projectSagas,
    accountSagas,
];

const registerSagas = (middleware) => {
    sagas.map((saga) => {
        middleware.run(saga);
    });
};

export default registerSagas;