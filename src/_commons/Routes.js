
const app = "/app/";
const documents = app + "documentos";

const ROUTES = Object.freeze({ 
    LOGIN:"/login",
    BASE_APP_ROUTE:app,
    FIRST_PAGE_APP:app + "perfil",
    DOCUMENTS:documents,
    USERS:app + "usuarios",
    USER_DETAILS:app + "usuarios/:id",
    USER_NEW:app + "usuarios/nuevo",
    PROFILE:app + "perfil"
});

export default ROUTES;