import Constants from "../../_commons/Constants";


function getSessionToken() {
    return window.localStorage.getItem(Constants.TOKEN_KEY);
}

function saveSessionToken(token) {
    window.localStorage.setItem(Constants.TOKEN_KEY,token);
}

function isHaveSessionToken() {
    
    const token = window.localStorage.getItem(Constants.TOKEN_KEY);
    return token != null && String(token).length > 0;
}

const SessionRepository = {
    getSessionToken,
    saveSessionToken,
    isHaveSessionToken
};

export default SessionRepository;