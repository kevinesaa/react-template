
import ListListener from "../../../_commons/util/ListListenerContainer";


export default class ForgotPasswordViewModel {

    constructor() {
        this.listenerOnRequestChangePassSuccessful = new ListListener();
        this.listenerOnLoading = new ListListener();
        this.listenerShowError = new ListListener();
    }
    
    unsubscribeOnRequestChangePassSuccessful(func) {
        this.listenerOnRequestChangePassSuccessful.unsubscribe(func);
    }

    subscribeOnRequestChangePassSuccessful(func) {
        this.listenerOnRequestChangePassSuccessful.subscribe(func);
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

    requestChangePassword(email) {
        
        this.#onLoading(true);
        
        this.#onLoading(false);
        this.#onRequestChangePassSuccessful();
        
    }

    #onLoading(value) {
        this.listenerOnLoading.execute(value);
    }

    #onRequestChangePassSuccessful() {
        this.listenerOnRequestChangePassSuccessful.execute();
    }

    #onError(error) {
        this.listenerShowError.execute(error);
    }
}