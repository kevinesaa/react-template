import StringsUtil from "../../../_commons/util/StringsUtil";

export default class LoginViewModel
{

    constructor() {
        this.listenerOnLoading = [];
        this.listenerShowError = [];
        this.listenerLoginSuccessful = [];
    }

    unsubscribeOnLoading(func) {
        this.listenerOnLoading = this.listenerOnLoading.filter( f => f !== func);
    }

    subscribeOnLoading(func) {
        this.listenerOnLoading.push(func);
    }

    unsubscribeOnShowError(func) {
        this.listenerShowError = this.listenerShowError.filter( f => f !== func);
    }

    subscribeOnShowError(func)
    {
        this.listenerShowError.push(func);
    }

    unsubscribeOnLoginSuccessful(func) {
        this.listenerLoginSuccessful = this.listenerLoginSuccessful.filter( f => f !== func);
    }

    subscribeOnLoginSuccessful(func) {
        this.listenerLoginSuccessful.push(func);
    }

    async loginWithMail(email,pass) {

        if((!StringsUtil.isString(email) || StringsUtil.isEmptyOrNull(email))
            || (!StringsUtil.isString(pass) || StringsUtil.isEmptyOrNull(pass))) 
        {
            
            this.#onError();
        }
        else {

            this.#onLoading(true);
            const response = await this.#simulateRequest(email,pass);
            this.#onLoading(false);
            if (response.statusCode == 200)
            {
                window.localStorage.setItem("token",response.token );
                this.#onLoginSuccessful();
               
            }
            else 
            {
                this.#onError({errorMessage:""});
            }
        }
    }

    #onLoading(value) {
        this.listenerOnLoading?.forEach(callback => callback(value));
    }

    #onLoginSuccessful() {
        this.listenerLoginSuccessful?.forEach( callback => callback());
    }

    #onError(error) {
        this.listenerShowError?.forEach( callback => callback(error));
    }

    async #simulateRequest(email,pass){
        await this.#delay(1000);
        return { statusCode:200, token:"asdfasdfglhilñ"};
    }

    #delay(milliseconds){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }
}

