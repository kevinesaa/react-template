import axios from 'axios';
import PermissionRepository from '../../../sessionManager/repository/PermissionsRepository';
import SessionRepository from "../../../sessionManager/repository/SessionRepository";
import API_END_POINTS from '../../../_commons/Api';

import ListListener from "../../../_commons/util/ListListenerContainer";
import AllUserPermissionsRepository from '../../userPermissions/repositories/AllUsersPermissionsRepository';
import CompanyAndPermissionsRepository from '../../../sessionManager/repository/CompanyAndPermissionsRepository';
import Permissions from '../../../_commons/Permissions';

export default class UserDetailsViewModel {

    
    #allPermissions=[];
    
    constructor() {
        this.listenerOnLoading = new ListListener();
        this.listenerShowError = new ListListener();
        this.listenerOnPermissionsList = new ListListener();
    }

    unsubscribeOnLoading(func) {
        this.listenerOnLoading.unsubscribe(func);
    }

    subscribeOnLoading(func) {
        this.listenerOnLoading.subscribe(func);
    }

    unsubscribeOnShowError(func) {
        this.listenerShowError.unsubscribe(func);
    }

    subscribeOnShowError(func) {
        this.listenerShowError.subscribe(func);
    }
    
    unsubscribeOnRequestPermissionsList(func) {
        this.listenerOnPermissionsList.unsubscribe(func);
    }

    subscribeOnRequestPermissionsList(func) {
        this.listenerOnPermissionsList.subscribe(func);
    }
    
    async requestUserDetails(userId) {

        this.#onLoading(true);
        const sessionCompaniesByPermissions = this.#getSessionCompaniesPermissions();
        const token = SessionRepository.getSessionToken();
        const permissionResponse = await this.#makeRequestPermissionsList({token});
        
        if (permissionResponse.status != 200) {
            this.#onLoading(false);
            this.#onError({errorCode:"fail_request"});
        }
        else { 
            
            const userDetailResponse = this.#makeGetUserDetailRequest({token,userId});
            
            const permissionsList = 
                permissionResponse.data.data
                    .filter(item => sessionCompaniesByPermissions.editUsers.map(company => company.id).includes(item.IDCASA))    
                    .sort((a,b) => a.IDCASA - b.IDCASA);

            this.#allPermissions = permissionResponse.data.data;
            
            this.#onLoading(false);
            this.listenerOnPermissionsList.execute(permissionsList);
        }
    }

    async updateUser(user) {

    }

    #onLoading(value) {
        this.listenerOnLoading.execute(value);
    }
    
    #onError(error) {
        this.listenerShowError.execute(error);
    }

    #getSessionCompaniesPermissions() {
        
        const editUsers = CompanyAndPermissionsRepository.getCompaniesByPermissons([Permissions.ID_ALL_PERMISSIONS,Permissions.ID_UPDATE_USERS]);
        const deleteUsers = CompanyAndPermissionsRepository.getCompaniesByPermissons([Permissions.ID_ALL_PERMISSIONS,Permissions.ID_DISABLE_USERS]);
        return {editUsers,deleteUsers};
    }

    async #makeRequestPermissionsList(requestModel) {
        
        return await AllUserPermissionsRepository.getPermissionsList(requestModel);
    }

    async #makeGetUserDetailRequest(requestModel) {
        return {status:200, data:{ data: {
            CORREO:"mock@test.com",
            APELLIDO:"apellido usuario",
            NOMBRE:"nombre usuario",
            ACTIVO: 1,
            permissions:[],
            companies:[],
        }}}
    }

}

