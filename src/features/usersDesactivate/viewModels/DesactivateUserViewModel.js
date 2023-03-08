import axios from 'axios';
import ListListener from "../../../_commons/util/ListListenerContainer";
import CompanyAndPermissionsRepository from '../../../sessionManager/repository/CompanyAndPermissionsRepository';
import SessionRepository from '../../../sessionManager/repository/SessionRepository';
import API_END_POINTS from '../../../_commons/Api';
import ErrorCodes from '../../../_commons/InternalErrorCodes';
import Permissions from '../../../_commons/Permissions';

import delay from "../../../_commons/util/Delay";

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
        this.#listenerOnLoading.execute(true);
        await delay(200);
        this.#listenerOnLoading.execute(false);
        this.#listenerOnError.execute();
    }

    async #makeRequest(requestModel){

        const url = API_END_POINTS.UPDATE_DESACTIVATE_USER;

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