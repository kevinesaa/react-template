import axios from 'axios';
import SessionRepository from "../../../sessionManager/repository/SessionRepository";
import API_END_POINTS from '../../../_commons/Api';

import ListListener from "../../../_commons/util/ListListenerContainer";
import AllUserPermissionsRepository from '../../userPermissions/repositories/AllUsersPermissionsRepository';
import CompanyAndPermissionsRepository from '../../../sessionManager/repository/CompanyAndPermissionsRepository';
import Permissions from '../../../_commons/Permissions';


export default class UserDetailsViewModel {

    #activateUserPermissions;
    #userCompanies;
    #selectablePermissions;

    #listenerOnLoading;
    #listenerOnSessionsPermissions;
    #listenerShowUser;
    #listenerShowUserPermissions;
    #listenerOnUpdateUserComplete;
    #listenerShowError;
    #listenerOnSessionSelectablePermissionsList;
    
    constructor() {
        this.#listenerOnLoading = new ListListener();
        this.#listenerOnSessionsPermissions = new ListListener();
        this.#listenerShowUser = new ListListener();
        this.#listenerShowUserPermissions = new ListListener();
        this.#listenerOnUpdateUserComplete = new ListListener();
        this.#listenerShowError = new ListListener();
        this.#listenerOnSessionSelectablePermissionsList = new ListListener();
    }

    unsubscribeOnLoading(func) {
        this.#listenerOnLoading.unsubscribe(func);
    }

    subscribeOnLoading(func) {
        this.#listenerOnLoading.subscribe(func);
    }

    unsubscribeOnSessionPermissions(func) {
        this.#listenerOnSessionsPermissions.unsubscribe(func);
    }

    subscribeOnSessionPermissions(func) {
        this.#listenerOnSessionsPermissions.subscribe(func);
    }

    unsubscribeOnShowError(func) {
        this.#listenerShowError.unsubscribe(func);
    }

    subscribeOnShowError(func) {
        this.#listenerShowError.subscribe(func);
    }

    unsubscribeOnUpdateUserComplete(func) {
        this.#listenerOnUpdateUserComplete.unsubscribe(func);
    }

    subscribeOnUpdateUserComplete(func) {
        this.#listenerOnUpdateUserComplete.subscribe(func);
    }
    
    unsubscribeOnRequestSelectablePermissionsList(func) {
        this.#listenerOnSessionSelectablePermissionsList.unsubscribe(func);
    }

    subscribeOnRequestSelectablePermissionsList(func) {
        this.#listenerOnSessionSelectablePermissionsList.subscribe(func);
    }

    unsubscribeOnShowUser(func) {
        this.#listenerShowUser.unsubscribe(func);
    }

    subscribeOnShowUser(func) {
        this.#listenerShowUser.subscribe(func);
    }

    unsubscribeOnShowUserPermissions(func) {
        this.#listenerShowUserPermissions.unsubscribe(func);
    }

    subscribeOnShowUserPermissions(func) {
        this.#listenerShowUserPermissions.subscribe(func);
    }

    async requestUserDetails(userId) {

        this.#onLoading(true);
        const sessionCompaniesByPermissions = this.#getSessionCompaniesPermissions();
        const token = SessionRepository.getSessionToken();
        const permissionResponse = await this.#makeRequestPermissionsList({token});
        
        if (permissionResponse.status != 200) {
            
            this.#onError({
                errorCode:"fail_request",
                sourceErrorMessage:"fail to get permissions"
            });
        }
        else { 
            
            const userDetailResponse = await this.#makeGetUserDetailRequest({token,userId});
            
            if (userDetailResponse.status != 200) {
            
                this.#onError({errorCode:"fail_request",
                    sourceErrorMessage:"fail to get user info"
                });
            }
            else { 

                const user = userDetailResponse?.data?.user;
                const userPermissions = userDetailResponse?.data?.permissions;
                const userCompanies = userDetailResponse?.data?.companies;
                this.#userCompanies = userCompanies;
                

                const sessionPermissionsList = 
                    permissionResponse.data.data
                        .filter(item => sessionCompaniesByPermissions.editUsers.map(company => company.id).includes(item.IDCASA))    
                        .sort((a,b) => a.IDCASA - b.IDCASA);

            
                const seeUsers = this.#sessionPermissionHelper(sessionCompaniesByPermissions.seeUsers,userCompanies);
                const deleteUsers = this.#sessionPermissionHelper(sessionCompaniesByPermissions.deleteUsers,userCompanies);
                const editUsers = this.#sessionPermissionHelper(sessionCompaniesByPermissions.editUsers,userCompanies);

                this.#notifyOnSessionPermissions({seeUsers,deleteUsers,editUsers});
                if(seeUsers) {
                    
                    this.#activateUserPermissions = sessionPermissionsList
                        .filter(p => userPermissions.map(i => i.id_casa_permiso).includes(p.id))
                        .map(permission => {
                            return {
                                id:permission.id,
                                id_company:permission.IDCASA,
                                company:permission.CASA,
                                id_permission:permission.IDPERMISO,
                                permission:permission.PERMISO
                            }
                        });
                    const userPermissionsFilter = userPermissions.filter(item => sessionCompaniesByPermissions.seeUsers.map(i => i.id).includes(item.company_id)); 
                    this.#onShowUser(user);
                    this.#onShowUserPermissions(userPermissionsFilter);
                    if(editUsers) {
                        this.#onShowSelectablePermissions(sessionPermissionsList);
                    }
                    
                }

            }
        }
        this.#onLoading(false);
    }

    async updateUser(user) {
        
        const sessionCompaniesByPermissions = this.#getSessionCompaniesPermissions();
        const editUsers = this.#sessionPermissionHelper(sessionCompaniesByPermissions.editUsers,this.#userCompanies);
        
        if(!editUsers) {
            console.log("you do not have permissions to edit this users");
            this.#onError({errorCode:"fail_missing_permissions"});
        }
        else {
            this.#onLoading(true);
            const token = SessionRepository.getSessionToken();
            const permissionsToEnable = user.permissions?.filter(p => this.#selectablePermissions.map(item => item.id).includes(p.id));
            const permissionToDisable = this.#activateUserPermissions.filter(p => !permissionsToEnable.map(item => item.id).includes(p.id));
            const response = await this.#makeEditUserRequest({
                token,
                userId:user.id,
                email:user.email,
                name:user.name,
                lastName:user.lastName,
                permissionsToEnable,
                permissionToDisable
            });
            this.#onLoading(false);
            if ( response.status != 200)
            {
                this.#onError({errorCode:"fail_request"});
            }
            else 
            {
                const data = response.data;
                this.#onEditUserSuccessful(data);
            }
        }
    }

    #onLoading(value) {
        this.#listenerOnLoading.execute(value);
    }
    
    #onError(error) {
        this.#listenerShowError.execute(error);
    }

    #onEditUserSuccessful(userInfo) {
        
        const sessionCompaniesByPermissions = this.#getSessionCompaniesPermissions();
        const sessionPermissionsList = this.#selectablePermissions;

        const user = userInfo.user;
        const userPermissions = userInfo.permissions;
        this.#userCompanies = userInfo.companies;

        const userPermissionsFilter = userPermissions
                .filter(item => sessionCompaniesByPermissions.seeUsers.map(i => i.id).includes(item.company_id)); 
        
        
        this.#activateUserPermissions = sessionPermissionsList
                .filter(p => userPermissions.map(i => i.id_casa_permiso).includes(p.id));
        
        this.#listenerOnUpdateUserComplete.execute();
        this.#onShowUser(user);
        this.#onShowUserPermissions(userPermissionsFilter);
    }

    #onShowSelectablePermissions(permissionsList) {
        
        const permissions = permissionsList.map(item => {
            return {
                id:item.id,
                id_company:item.IDCASA,
                company:item.CASA,
                id_permission:item.IDPERMISO,
                permission:item.PERMISO
            }
        });
        this.#selectablePermissions = permissions;
        this.#listenerOnSessionSelectablePermissionsList.execute(permissions);
    }

    #onShowUser(userInfo) {
        
        const user = {
            id:userInfo.user_id,
            email:userInfo.email, 
            name:userInfo.userName, 
            lastName:userInfo.userLastName, 
            status:userInfo.activo
        };
        this.#listenerShowUser.execute(user);
    }

    #onShowUserPermissions(userPermissions) {
        
        const permissions = userPermissions.map(item => {
            return {
                id:item.id_casa_permiso,
                id_company:item.company_id,
                company:item.company_name,
                id_permission:item.permission_id,
                permission:item.permission_name
            }
        });

        this.#listenerShowUserPermissions.execute(permissions);
    }

    #notifyOnSessionPermissions(permissions) {
        this.#listenerOnSessionsPermissions.execute(permissions);
    }

    #getSessionCompaniesPermissions() {
        
        const seeUsers = CompanyAndPermissionsRepository.getCompaniesByPermissons([Permissions.ID_ALL_PERMISSIONS,Permissions.ID_SEE_USERS]);
        const editUsers = CompanyAndPermissionsRepository.getCompaniesByPermissons([Permissions.ID_ALL_PERMISSIONS,Permissions.ID_UPDATE_USERS]);
        const deleteUsers = CompanyAndPermissionsRepository.getCompaniesByPermissons([Permissions.ID_ALL_PERMISSIONS,Permissions.ID_DISABLE_USERS]);
        return {seeUsers,editUsers,deleteUsers};
    }
    
    #sessionPermissionHelper(sessionPermissions,userCompanies) {
        
        const permissions = sessionPermissions
                .filter(item => userCompanies.map(i => i.id).includes(item.id));
        return permissions.length > 0;
    }

    async #makeRequestPermissionsList(requestModel) {
        
        return await AllUserPermissionsRepository.getPermissionsList(requestModel);
    }

    async #makeGetUserDetailRequest(requestModel) {
        
        const endpoint = API_END_POINTS.GET_USER_DETAILS;
        const userId = `id=${requestModel.userId}`;
        const url = `${endpoint}?${userId}`;
        
        try{
            
            const response = await axios.get(url, { 
                headers:{
                    "Authorization": `Bearer ${requestModel.token}`,
                    "Content-Type": "application/json"
                }
            });
            
            return response;
        }
        catch(error) {
            console.error(error);
            return error.response;
        }
    }

    async #makeEditUserRequest(requestModel) {
        
        const url = API_END_POINTS.UPDATE_USER;
        
        try{

            const response = await axios(url, { 
                method: 'put',    
                headers:{
                    "Authorization": `Bearer ${requestModel.token}`,
                    "Content-Type": "application/json"
                },
                data:JSON.stringify({
                    id:requestModel.userId,
                    email:requestModel.email,
                    name:requestModel.name,
                    last_name:requestModel.lastName,
                    enable_perm:requestModel.permissionsToEnable.map(item => item.id),
                    disable_perm:requestModel.permissionToDisable.map(item => item.id)
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

