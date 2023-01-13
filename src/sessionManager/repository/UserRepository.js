import Constants from "../../_commons/Constants";

function saveCurrentUser(user) {
    if(user == null) {
        window.localStorage.setItem(Constants.USER_KEY,null);
        return;
    }
    window.localStorage.setItem(Constants.USER_KEY,JSON.stringify(user));
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