
// sagas
import authSagas from "./auth";
import projectSagas from "./project";

const sagas = [
    authSagas,
    projectSagas,
];

const registerSagas = (middleware) => {
    sagas.map((saga) => {
        middleware.run(saga);
    });
};

export default registerSagas;