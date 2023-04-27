let BASE_URL = process.env.REACT_APP_REMOTE_API_BASE_URL;
BASE_URL = BASE_URL.endsWith('/')?BASE_URL.substring(0,BASE_URL.length-1):BASE_URL;

const ENDPOINT_LIST = { 
    LOGIN:"/login/",
    VERIFY_TOKEN_SESSION:"/login/session-token/",
    GET_DOCUMENT_LIST:"/documentos/",
    GET_DOCUMENT_DETAIL:"/documentos/detalles/",
    GET_DOCUMENT_REPORT:"/documentos/crear-reporte/",
    PROFILE_CHANGE_PASSWORD:"/usuario/change-password/",
    GET_PERMISSIONS_LIST:"/usuario/get-all-permissions/",
    GET_USERS_LIST:"/usuario/get-users/",
    UPDATE_DESACTIVATE_USER:"/usuario/enable-disable/",
    CREATE_USER:"/usuario/add-user/",
};

const API_END_POINTS = Object.freeze(
    Object.keys(ENDPOINT_LIST).reduce(
        (acc,k) => {
            const endpoint = ENDPOINT_LIST[k];
            acc[k] = `${BASE_URL}${endpoint}`;
            return acc;
        },{})
);

export default API_END_POINTS;