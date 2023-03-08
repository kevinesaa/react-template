import axios from 'axios';
import PermissionRepository from '../../../sessionManager/repository/PermissionsRepository';
import SessionRepository from "../../../sessionManager/repository/SessionRepository";
import API_END_POINTS from '../../../_commons/Api';
import Permissions from '../../../_commons/Permissions';
import delay from '../../../_commons/util/Delay';
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
                PermissionRepository
                    .getPermissionList()
                    .filter(item => item.permission_id == Permissions.ID_ALL_PERMISSIONS || item.permission_id == Permissions.ID_CREATE_USERS)
                    .map(item => item.company_id);
            //
            const permissionsList = 
                response.data.data
                    .filter(item =>  companiesIds.includes(item.IDCASA) )
                    .sort((a,b) => a.IDCASA - b.IDCASA);
            //
            this.#onLoading(false);
            this.#listenerOnPermissionsList.execute(permissionsList);
        }
    }

    async createNewUser(newUser) {
        this.#onLoading(true);
        await delay(1000);
        this.#onLoading(false);
        this.#notifyCreateUserSuccessful();
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

}