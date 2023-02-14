import Constants from "../../_commons/Constants";

function saveCurrentUser(user) {
    
    if(user) {
        window.localStorage.setItem(Constants.USER_KEY,JSON.stringify(user));    
    }
    else {
        window.localStorage.removeItem(Constants.USER_KEY);
    }
}

function getCurrentUser() {
    
    let userObjectAsString = window.localStorage.getItem(Constants.USER_KEY);
    if(userObjectAsString == null || String(userObjectAsString).length <= 0)
    {
        userObjectAsString = "{}";
    }

    return JSON.parse(userObjectAsString);
}

const UserRepository = Object.freeze({
    saveCurrentUser,
    getCurrentUser
});

export default UserRepository;