import axios from 'axios';
import ListListener from "../../../_commons/util/ListListenerContainer";
import CompanyAndPermissionsRepository from '../../../sessionManager/repository/CompanyAndPermissionsRepository';
import SessionRepository from '../../../sessionManager/repository/SessionRepository';
import API_END_POINTS from '../../../_commons/Api';
import ErrorCodes from '../../../_commons/InternalErrorCodes';
import Permissions from '../../../_commons/Permissions';


export default class DesactivateUserViewModel {

    #listenerOnLoading;
    #listenerOnError;
    #listenerOnOperationCompletedSuccessful;

    constructor() {
        this.#listenerOnLoading = new ListListener();
        this.#listenerOnError = new ListListener();
        this.#listenerOnOperationCompletedSuccessful = new ListListener();
    }

    unsubscribeOnLoading(func) {
        this.#listenerOnLoading.unsubscribe(func);
    }

    subscribeOnLoading(func) {
        this.#listenerOnLoading.subscribe(func);
    }

    unsubscribeOnError(func) {
        this.#listenerOnError.unsubscribe(func);
    }

    subscribeOnError(func) {
        this.#listenerOnError.subscribe(func);
    }
    
    unsubscribeOnOperationCompletedSuccessful(func) {
        this.#listenerOnOperationCompletedSuccessful.unsubscribe(func);
    }

    subscribeOnOperationCompletedSuccessful(func) {
        this.#listenerOnOperationCompletedSuccessful.subscribe(func);
    }

    async desactivateUser(userId) {
        
        const deleteUsersByCompanyPermissions = CompanyAndPermissionsRepository.getCompaniesByPermissons([Permissions.ID_ALL_PERMISSIONS,Permissions.ID_DISABLE_USERS]);
        if(deleteUsersByCompanyPermissions.lenght < 1)
        {
            console.log("you do not have permissions to delete users");
            this.#onError({errorCode:"fail_missing_permissions"});
        }
        else 
        {
            this.#listenerOnLoading.execute(true);
            const token = SessionRepository.getSessionToken();
          
            const response = await this.#makeRequest({
                token,
                userId
            });
            
            this.#listenerOnLoading.execute(false);
            if ( response.status != 200)
            {
                this.#onError({errorCode:"fail_request"});
            }
            else 
            {
                const obj = {user:response?.data?.data?.user};
                this.#listenerOnOperationCompletedSuccessful.execute(obj);
            }
        }
    }

    #onError(error) {
        this.#listenerOnError.execute(error);
    }

    async #makeRequest(requestModel) {

        const endpoint = API_END_POINTS.UPDATE_DESACTIVATE_USER;
        const userId = `id=${requestModel.userId}`;
        const url = `${endpoint}?${userId}`;
        try{

            const response = await axios(url, { 
                method: 'put',    
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