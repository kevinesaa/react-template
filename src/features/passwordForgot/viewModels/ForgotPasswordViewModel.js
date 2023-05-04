import axios from 'axios';
import API_END_POINTS from '../../../_commons/Api';
import ListListener from "../../../_commons/util/ListListenerContainer";
import StringsUtil from "../../../_commons/util/StringsUtil";

export default class ForgotPasswordViewModel {

    #listenerOnRequestChangePassSuccessful;
    #listenerOnLoading;
    #listenerShowError;

    constructor() {
        this.#listenerOnRequestChangePassSuccessful = new ListListener();
        this.#listenerOnLoading = new ListListener();
        this.#listenerShowError = new ListListener();
    }
    
    unsubscribeOnRequestChangePassSuccessful(func) {
        this.#listenerOnRequestChangePassSuccessful.unsubscribe(func);
    }

    subscribeOnRequestChangePassSuccessful(func) {
        this.#listenerOnRequestChangePassSuccessful.subscribe(func);
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

    async requestChangePassword(email) {
        
        if(!StringsUtil.isString(email) || StringsUtil.isEmptyOrNull(email))
        {
            this.#onError({errorCode:"REQUIRE_EMAIL"});
        }
        else {
            
            this.#onLoading(true);
            const response = await this.#makeForgotPassRequest({email});
            this.#onLoading(false);
            
            if (response.status != 200)
            {
                this.#onError({errorCode:"fail_request"});
            }
            else 
            {
                this.#onRequestChangePassSuccessful();
            }
        }
        
    }

    #onLoading(value) {
        this.#listenerOnLoading.execute(value);
    }

    #onRequestChangePassSuccessful() {
        this.#listenerOnRequestChangePassSuccessful.execute();
    }

    #onError(error) {
        this.#listenerShowError.execute(error);
    }

   async #makeForgotPassRequest(requestModel) {

        const url = API_END_POINTS.FORGOT_PASSWORD;

        try{

            const response = await axios(url, { 
                method: 'post',    
                headers:{
                    "Content-Type": "application/json"
                },
                data:JSON.stringify({
                    email: requestModel.email,
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