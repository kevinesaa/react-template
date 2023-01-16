
const app = "/app/";
const documents = app + "documentos";

const ROUTES = Object.freeze({ 
    LOGIN:"/login",
    BASE_APP_ROUTE:app,
    FIRST_PAGE_APP:documents,
    DOCUMENTS:documents,
    USERS:app + "usuarios",
    PROFILE:app + "perfil"
});

export default ROUTES;