import axios from 'axios';

import MainSessionRepository from "../../../sessionManager/repository/MainSessionRepository";
import API_END_POINTS from '../../../_commons/Api';
import ListListener from "../../../_commons/util/ListListenerContainer";
import StringsUtil from "../../../_commons/util/StringsUtil";


export default class LoginViewModel
{

    constructor() {
        this.listenerOnLoading = new ListListener();
        this.listenerShowError = new ListListener();
        this.listenerLoginSuccessful = new ListListener();
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

    subscribeOnShowError(func)
    {
        this.listenerShowError.subscribe(func);
    }

    unsubscribeOnLoginSuccessful(func) {
        this.listenerLoginSuccessful.unsubscribe(func);
    }

    subscribeOnLoginSuccessful(func) {
        this.listenerLoginSuccessful.subscribe(func);
    }

    async loginWithMail(email,pass) {
        
        if((!StringsUtil.isString(email) || StringsUtil.isEmptyOrNull(email))
            || (!StringsUtil.isString(pass) || StringsUtil.isEmptyOrNull(pass))) 
        {
            
            this.#onError({errorCode:"REQUIRE_EMAIL_AND_PASS"});
        }
        else {

            this.#onLoading(true);
            const response = await this.#makeLoginRequest(email,pass);
            this.#onLoading(false);
            if (response.status != 200)
            {
                this.#onError({errorCode:"fail_request"});
            }
            else 
            {
                const token = response?.data?.token;
                if(token == null) {
                    this.#onError({errorCode:"NOT_FOUND_TOKEN"});
                    return ;
                }
                
                MainSessionRepository.saveSession({token, data:response.data.data});
                this.#onLoginSuccessful();
            }
            
        }
    }

    #onLoading(value) {
        this.listenerOnLoading.execute(value);
    }

    #onLoginSuccessful() {
        this.listenerLoginSuccessful.execute();
    }

    #onError(error) {
        this.listenerShowError.execute(error);
    }

    async #makeLoginRequest(email,pass){
        
        const url = API_END_POINTS.LOGIN;

        try{

            const response = await axios(url, { 
                method: 'post',    
                headers:{
                    "Content-Type": "application/json"
                },
                data:JSON.stringify({
                    email: email,
                    password: pass
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