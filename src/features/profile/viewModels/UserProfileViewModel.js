import axios from 'axios';
import UserRepository from "../../../sessionManager/repository/UserRepository";
import ListListener from "../../../_commons/util/ListListenerContainer";

import API_END_POINTS from "../../../_commons/Api";
import SessionRepository from "../../../sessionManager/repository/SessionRepository";
import ErrorCodes from '../../../_commons/InternalErrorCodes';


export default class UserProfileViewModel {

    #listenerOnLoading;
    #listenerShowError;
    #listenerOnUserInfo;
    #listenerOnUpdateUserSuccessful;

    constructor() 
    {    
        this.#listenerOnLoading = new ListListener();
        this.#listenerShowError = new ListListener();
        this.#listenerOnUserInfo = new ListListener();
        this.#listenerOnUpdateUserSuccessful = new ListListener();
    }

    unsubscribeOnUpdateUserProfileCompleted(func) {
        this.#listenerOnUpdateUserSuccessful.unsubscribe(func);
    }

    subscribeOnUpdateUserProfileCompleted(func) {
        this.#listenerOnUpdateUserSuccessful.subscribe(func);
    }

    unsubscribeOnUserInfoCompleted(func) {
        this.#listenerOnUserInfo.unsubscribe(func);
    }

    subscribeOnUserInfoCompleted(func) {
        this.#listenerOnUserInfo.subscribe(func);
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

    subscribeOnShowError(func)
    {
        this.#listenerShowError.subscribe(func);
    }

    async requestUserInfo() {
        const userData = UserRepository.getCurrentUser();
        this.#onUserData(userData);
    }

    async updateProfile(user) {
        
        this.#onLoading(true);
        const token = SessionRepository.getSessionToken();
        const response = await this.#makeUpdateProfileRequest({
            token,
            email:user.email,
            name:user.name,
            lastName:user.lastName
        });
        
        if(response.status != 200)
        {
            this.#onError({errorCode:"fail_request"});    
        }
        else 
        {
            const userData = UserRepository.getCurrentUser();
            const user = response.data.user;
            
            userData.email = user.email;
            userData.userName = user.userName;
            userData.userLastName = user.userLastName;
            
            UserRepository.saveCurrentUser(userData);
            
            this.#onUpdateProfileCompleted();
        }
        
        this.#onLoading(false);
        
    }

    #onUpdateProfileCompleted() {
        this.#listenerOnUpdateUserSuccessful.execute();
    }

    #onUserData(userData) {
        this.#listenerOnUserInfo.execute(userData);
    }

    #onLoading(value) {
        this.#listenerOnLoading.execute(value);
    }

    #onError(error) {
        this.#listenerShowError.execute(error);
    }

    async #makeUpdateProfileRequest(requestModel) {

        const url = API_END_POINTS.PROFILE_UPDATE;
        
        try{

            const response = await axios(url, { 
                method: 'put',    
                headers:{
                    "Authorization": `Bearer ${requestModel.token}`,
                    "Content-Type": "application/json"
                },
                data:JSON.stringify({
                    
                    email:requestModel.email,
                    name:requestModel.name,
                    last_name:requestModel.lastName
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