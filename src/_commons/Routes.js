
const app = "/app";
const documents = `${app}/documentos/`;
const users = `${app}/usuarios`;

const ROUTES = Object.freeze({ 
    ROOT:"/",
    LOGIN:"/login",
    CHANGE_PASS_EXTERNAL:"/restore_pass",
    BASE_APP_ROUTE:app,
    FIRST_PAGE_APP:documents,
    DOCUMENTS:documents,
    DOCUMENTS_MISSING:`${app}/faltantes/`,
    USERS:users,
    USER_DETAILS:`${users}/:id`,
    USER_NEW:`${users}/nuevo`,
    PROFILE:`${app}/perfil`
});

export default ROUTES;