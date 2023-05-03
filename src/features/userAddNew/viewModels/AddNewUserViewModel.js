import axios from 'axios';
import CompanyAndPermissionsRepository from '../../../sessionManager/repository/CompanyAndPermissionsRepository';
import PermissionRepository from '../../../sessionManager/repository/PermissionsRepository';
import SessionRepository from "../../../sessionManager/repository/SessionRepository";
import API_END_POINTS from '../../../_commons/Api';
import Permissions from '../../../_commons/Permissions';
import ListListener from "../../../_commons/util/ListListenerContainer";
import AllUserPermissionsRepository from '../../userPermissions/repositories/AllUsersPermissionsRepository';



export default class AddNewUserViewModel {

    #listenerOnLoading;
    #listenerOnPermissionsList;
    #listenerShowError;
    #listenerOnCreateUserSuccessful;

    constructor() {
        this.#listenerOnLoading = new ListListener();
        this.#listenerShowError = new ListListener();
        this.#listenerOnPermissionsList = new ListListener();
        this.#listenerOnCreateUserSuccessful = new ListListener();
    }

    unsubscribeOnLoading(func) {
        this.#listenerOnLoading.unsubscribe(func);
    }

    subscribeOnLoading(func) {
        this.#listenerOnLoading.subscribe(func);
    }

    unsubscribeOnShowError(func) {
        this.#listenerShowError.unsubscribe(func);
    }

    subscribeOnShowError(func) {
        this.#listenerShowError.subscribe(func);
    }
    
    unsubscribeOnRequestPermissionsList(func) {
        this.#listenerOnPermissionsList.unsubscribe(func);
    }

    subscribeOnRequestPermissionsList(func) {
        this.#listenerOnPermissionsList.subscribe(func);
    }

    unsubscribeOnCreateUserSuccessful(func) {
        this.#listenerOnCreateUserSuccessful.unsubscribe(func);
    }

    subscribeOnCreateUserSuccessful(func) {
        this.#listenerOnCreateUserSuccessful.subscribe(func);
    }
    
    async requestPermissionsList() {

        this.#onLoading(true);
        
        const token = SessionRepository.getSessionToken();
        const response = await this.#makeRequestPermissionsList({token});
       
        if (response.status != 200) {
            this.#onLoading(false);
            this.#onError({errorCode:"fail_request"});
        }
        else { 
            
            const companiesIds = 
                CompanyAndPermissionsRepository
                    .getCompaniesByPermissons([Permissions.ID_ALL_PERMISSIONS,Permissions.ID_CREATE_USERS])
                    .map(item => item.id);
            
            const permissionsList = 
                response.data.data
                    .filter(item =>  companiesIds.includes(item.IDCASA) )
                    .sort((a,b) => a.IDCASA - b.IDCASA);
            
            this.#onLoading(false);
            this.#listenerOnPermissionsList.execute(permissionsList);
        }
    }

    async createNewUser(newUser) {
        
        
        const creteUsersByCompanyPermissions = CompanyAndPermissionsRepository.getCompaniesByPermissons([Permissions.ID_ALL_PERMISSIONS,Permissions.ID_CREATE_USERS]);
        
        if(creteUsersByCompanyPermissions.lenght < 1)
        {
            console.log("you do not have permissions to create users");
            this.#onError({errorCode:"fail_missing_permissions"});
        }
        else 
        {
            const userComapaniesIds = creteUsersByCompanyPermissions.map(c => c.id);
            const newUserCompaniesIds = newUser.pemissions.map(p => p.IDCASA);
            
            if(!newUserCompaniesIds.every(elem => userComapaniesIds.includes(elem))) {
                
                console.log("you do not have permissions at one or more companies");
                this.#onError({errorCode:"fail_missing_company_permissions"});
            }
            else {
                
                this.#onLoading(true);
                const token = SessionRepository.getSessionToken();
                const permissions = newUser.pemissions == null ? [] : newUser.pemissions.map(p => p.id);
                const response = await this.#makeRequestCreateNewUser({
                    token,
                    email:newUser.email,
                    name:newUser.name,
                    lastName:newUser.lastName,
                    permissions:permissions
                });
        
                this.#onLoading(false);
                if (response.status != 200)
                {
                    this.#onError({errorCode:"fail_request"});
                }
                else 
                {
                    const user = response.data.user;
                    const userResponse = {
                        userId:user.user_id,
                        name:user.userName,
                        lastName:user.userLastName,
                        email:user.email,
                        permissions:response.data.permissions,
                        companies:response.data.companies
                    };
                    this.#notifyCreateUserSuccessful(userResponse);
                }
            }
        }
        
    }

    #onLoading(value) {
        this.#listenerOnLoading.execute(value);
    }
    
    #onError(error) {
        this.#listenerShowError.execute(error);
    }

    #notifyCreateUserSuccessful() {
        this.#listenerOnCreateUserSuccessful.execute();
    }

    async #makeRequestPermissionsList(requestModel) {
        
        return await AllUserPermissionsRepository.getPermissionsList(requestModel);
    }

    async #makeRequestCreateNewUser(requestModel) {
        
        const token = requestModel.token;
        const url = API_END_POINTS.CREATE_USER;
        
        try {

            const response = await axios(url, { 
                method: 'post',    
                headers:{
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                data:JSON.stringify({
                    
                    email:requestModel.email,
                    name:requestModel.name,
                    last_name:requestModel.lastName,
                    permission:requestModel.permissions
                })
            });
            
            return response;
        }
        catch(error) {
            console.error(error);
            return error.response;
        }
        
    }

}