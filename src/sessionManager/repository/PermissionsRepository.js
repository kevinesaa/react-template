import Constants from "../../_commons/Constants";

function savePermissionList(permissionList) {
    
    if(permissionList) {
        window.localStorage.setItem(Constants.PERMISSIONS_KEY,JSON.stringify(permissionList));
    }
    else {
        window.localStorage.removeItem(Constants.PERMISSIONS_KEY);
    }
}

function getPermissionList() {
    
    let permissionsAsString = window.localStorage.getItem(Constants.PERMISSIONS_KEY);
    if(permissionsAsString == null || String(permissionsAsString).length <= 0)
    {
        permissionsAsString = "[]";
    }

    return JSON.parse(permissionsAsString);
}

const PermissionRepository = Object.freeze({
    savePermissionList,
    getPermissionList
});

export default PermissionRepository;