let BASE_URL = process.env.REACT_APP_REMOTE_API_BASE_URL;
BASE_URL = BASE_URL.endsWith('/')?BASE_URL.substring(0,BASE_URL.length-1):BASE_URL;
const API_END_POINTS = Object.freeze({ 
    LOGIN:BASE_URL+"/login",
    GET_DOCUMENT_LIST:BASE_URL+"/documentos/",
    GET_DOCUMENT_DETAIL:BASE_URL+"/documentos/detalles/"
});

export default API_END_POINTS;