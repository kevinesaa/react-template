import axios from 'axios';
import ListListener from "../../../_commons/util/ListListenerContainer";

import UserRepository from "../../../sessionManager/repository/UserRepository";
import API_END_POINTS from "../../../_commons/Api";
import SessionRepository from "../../../sessionManager/repository/SessionRepository";
import ErrorCodes from '../../../_commons/InternalErrorCodes';

export default class ChangePasswordViewModel {

    constructor() {
        this.listenerOnLoading = new ListListener();
        this.listenerShowError = new ListListener();
        this.listenerOnChangePassSuccessful = new ListListener();
    }

    unsubscribeOnChangePassSuccessful(func) {
        this.listenerOnChangePassSuccessful.unsubscribe(func);
    }

    subscribeOnChangePassSuccessful(func) {
        this.listenerOnChangePassSuccessful.subscribe(func);
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

    async changePassword(currentPass,newPass,validateNewPass) {

        if(currentPass != null && newPass != null && validateNewPass != null) {

            if(newPass != validateNewPass) {
                
                this.#onError({errorCode:"confirm_pass_not_equal"});
                return;
            }

            this.#onLoading(true);
            const token = SessionRepository.getSessionToken();
            const response = await this.#makeRequest({token,newPass,currentPass});
            
            if(response.status != 200)
            {
                this.#onError({errorCode:"fail_request"});
                /*
                this.#onError({errorCode:ErrorCodes.SOURCE_ERROR,
                    sourceErrorCode:response?.data?.app_status,
                    sourceErrorMessage:response?.data?.message
                });
                */
            }
            else 
            {
                const user = UserRepository.getCurrentUser();
                user.new_user = false;
                UserRepository.saveCurrentUser(user);
                this.#onChangePassSuccessful();   
            }
            
            this.#onLoading(false);
        }
    }

    #onLoading(value) {
        this.listenerOnLoading.execute(value);
    }

    #onChangePassSuccessful() {
        this.listenerOnChangePassSuccessful.execute();
    }

    #onError(error) {
        this.listenerShowError.execute(error);
    }

    async #makeRequest(requestModel) {
        
        const url = `${API_END_POINTS.PROFILE_CHANGE_PASSWORD}`;
        
        try{

            const response = await axios({
                method:'put',
                url:url, 
                headers:{
                    "Authorization": `Bearer ${requestModel.token}`,
                    "Content-Type": "application/json"
                },
                data:JSON.stringify({
                    "actual_password": requestModel.currentPass,
                    "new_password": requestModel.newPass
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