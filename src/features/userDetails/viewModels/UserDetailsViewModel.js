import axios from 'axios';
import PermissionRepository from '../../../sessionManager/repository/PermissionsRepository';
import SessionRepository from "../../../sessionManager/repository/SessionRepository";
import API_END_POINTS from '../../../_commons/Api';

import ListListener from "../../../_commons/util/ListListenerContainer";
import AllUserPermissionsRepository from '../../userPermissions/repositories/AllUsersPermissionsRepository';
import CompanyAndPermissionsRepository from '../../../sessionManager/repository/CompanyAndPermissionsRepository';
import Permissions from '../../../_commons/Permissions';
import { Rtt } from '@mui/icons-material';

export default class UserDetailsViewModel {

    
    
    
    constructor() {
        this.listenerOnLoading = new ListListener();
        this.listenerOnSessionsPermissions = new ListListener();
        this.listenerShowUser = new ListListener();
        this.listenerShowUserPermissions = new ListListener();
        this.listenerShowError = new ListListener();
        this.listenerOnSessionSelectablePermissionsList = new ListListener();
    }

    unsubscribeOnLoading(func) {
        this.listenerOnLoading.unsubscribe(func);
    }

    subscribeOnLoading(func) {
        this.listenerOnLoading.subscribe(func);
    }

    unsubscribeOnSessionPermissions(func) {
        this.listenerOnSessionsPermissions.unsubscribe(func);
    }

    subscribeOnSessionPermissions(func) {
        this.listenerOnSessionsPermissions.subscribe(func);
    }

    unsubscribeOnShowError(func) {
        this.listenerShowError.unsubscribe(func);
    }

    subscribeOnShowError(func) {
        this.listenerShowError.subscribe(func);
    }
    
    unsubscribeOnRequestSelectablePermissionsList(func) {
        this.listenerOnSessionSelectablePermissionsList.unsubscribe(func);
    }

    subscribeOnRequestSelectablePermissionsList(func) {
        this.listenerOnSessionSelectablePermissionsList.subscribe(func);
    }

    unsubscribeOnShowUser(func) {
        this.listenerShowUser.unsubscribe(func);
    }

    subscribeOnShowUser(func) {
        this.listenerShowUser.subscribe(func);
    }

    unsubscribeOnShowUserPermissions(func) {
        this.listenerShowUserPermissions.unsubscribe(func);
    }

    subscribeOnShowUserPermissions(func) {
        this.listenerShowUserPermissions.subscribe(func);
    }

    async requestUserDetails(userId) {

        this.#onLoading(true);
        const sessionCompaniesByPermissions = this.#getSessionCompaniesPermissions();
        const token = SessionRepository.getSessionToken();
        const permissionResponse = await this.#makeRequestPermissionsList({token});
        
        if (permissionResponse.status != 200) {
            
            this.#onError({errorCode:"fail_request"});
        }
        else { 
            
            const userDetailResponse = await this.#makeGetUserDetailRequest({token,userId});
            
            const user = userDetailResponse?.data?.user;
            const userPermissions = userDetailResponse?.data?.permissions;
            const userCompanies = userDetailResponse?.data?.companies;
            
            
            const sessionPermissionsList = 
                permissionResponse.data.data
                    .filter(item => sessionCompaniesByPermissions.editUsers.map(company => company.id).includes(item.IDCASA))    
                    .sort((a,b) => a.IDCASA - b.IDCASA);

            
            const seeUsers = this.#sessionPermissionHelper(sessionCompaniesByPermissions.seeUsers,userCompanies);
            const deleteUsers = this.#sessionPermissionHelper(sessionCompaniesByPermissions.deleteUsers,userCompanies);
            const editUsers = this.#sessionPermissionHelper(sessionCompaniesByPermissions.editUsers,userCompanies);

            
            this.#notifyOnSessionPermissions({seeUsers,deleteUsers,editUsers});
            this.#onShowSelectablePermissions(sessionPermissionsList);
            this.#onShowUser(user);
            this.#onShowUserPermissions(userPermissions);
            

        }
        this.#onLoading(false);
    }

    async updateUser(user) {

    }

    #onLoading(value) {
        this.listenerOnLoading.execute(value);
    }
    
    #onError(error) {
        this.listenerShowError.execute(error);
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
        
        this.listenerOnSessionSelectablePermissionsList.execute(permissions);
    }

    #onShowUser(userInfo) {
        
        const user = {
            id:userInfo.user_id,
            email:userInfo.email, 
            name:userInfo.userName, 
            lastName:userInfo.userLastName, 
            status:userInfo.activo
        };
        this.listenerShowUser.execute(user);
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
       this.listenerShowUserPermissions.execute(permissions);
    }

    #notifyOnSessionPermissions(permissions) {
        this.listenerOnSessionsPermissions.execute(permissions);
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

}

