import Constants from "../../_commons/Constants";

function savePermissionList(permissionList) {
    if(permissionList == null) {
        window.localStorage.setItem(Constants.PERMISSIONS_KEY,null);
        return;
    }
    window.localStorage.setItem(Constants.PERMISSIONS_KEY,JSON.stringify(permissionList));
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