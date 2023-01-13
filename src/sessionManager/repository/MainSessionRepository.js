import CompanyRepository from "./CompanyRepository";
import PermissionRepository from "./PermissionsRepository";
import SessionRepository from "./SessionRepository";
import UserRepository from "./UserRepository";


function saveSession(sessionObject) {
    console.log(sessionObject)
    const companies = sessionObject.data?.companies;
    const permissions = sessionObject.data?.permissions;
    const user = sessionObject.data?.user;
    
    SessionRepository.saveSessionToken(sessionObject.token);
    CompanyRepository.saveCompanyList(companies);
    UserRepository.saveCurrentUser(user);
    PermissionRepository.savePermissionList(permissions);
}

function closeLocalSession() {

    SessionRepository.saveSessionToken(null);
    CompanyRepository.saveCompanyList([]);
    UserRepository.saveUser(null);
    PermissionRepository.savePermissionList([]);
}

const MainSessionRepository = Object.freeze({
    saveSession,
    closeLocalSession
});

export default MainSessionRepository;