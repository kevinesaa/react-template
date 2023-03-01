import axios from 'axios';
import CompanyAndPermissionsRepository from '../../../sessionManager/repository/CompanyAndPermissionsRepository';
import API_END_POINTS from '../../../_commons/Api';
import Permissions from '../../../_commons/Permissions';
import ListListener from "../../../_commons/util/ListListenerContainer";


export default class UserListViewModel {

    #listenerOnLoading;
    #listenerShowError;
    #listenerOnPermissionsList;

    constructor() {
        this.#listenerOnLoading = new ListListener();
        this.#listenerShowError = new ListListener();
        this.#listenerOnPermissionsList = new ListListener();
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
    
    async requestPermissionsList() {
        
        this.#onLoading(true);
        const creteUsers = CompanyAndPermissionsRepository.getCompaniesByPermissons([Permissions.ID_ALL_PERMISSIONS,Permissions.ID_CREATE_USERS]);
        const seeUsers = CompanyAndPermissionsRepository.getCompaniesByPermissons([Permissions.ID_ALL_PERMISSIONS,Permissions.ID_SEE_USERS]);
        const editUsers = CompanyAndPermissionsRepository.getCompaniesByPermissons([Permissions.ID_ALL_PERMISSIONS,Permissions.ID_UPDATE_USERS]);
        const deleteUsers = CompanyAndPermissionsRepository.getCompaniesByPermissons([Permissions.ID_ALL_PERMISSIONS,Permissions.ID_DISABLE_USERS]);
        this.#onLoading(false);
        this.#notifyPermissionsList({creteUsers, seeUsers,editUsers,deleteUsers });
    }

    async requestUserList(filters) {
        
    }

    #onLoading(value) {
        this.#listenerOnLoading.execute(value);
    }
    
    #onError(error) {
        this.#listenerShowError.execute(error);
    }

    #notifyPermissionsList(permissions) {
        this.#listenerOnPermissionsList.execute(permissions);
    }

}