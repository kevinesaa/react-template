let BASE_URL = process.env.REACT_APP_REMOTE_API_BASE_URL;
BASE_URL = BASE_URL.endsWith('/')?BASE_URL.substring(0,BASE_URL.length-1):BASE_URL;

const ENDPOINT_LIST = { 
    LOGIN:"/login/",
    VERIFY_TOKEN_SESSION:"/login/session-token/",
    GET_DOCUMENT_LIST:"/documentos/",
    GET_DOCUMENT_DETAIL:"/documentos/detalles/",
    GET_PERMISSIONS_LIST:"/usuario/get-all-permissions/",
    GET_USERS_LIST:"/usuario/get-users/"
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