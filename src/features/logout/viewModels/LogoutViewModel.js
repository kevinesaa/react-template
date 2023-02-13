import MainSessionRepository from "../../../sessionManager/repository/MainSessionRepository";
import ListListener from "../../../_commons/util/ListListenerContainer";


export default class LogoutViewModel {

    constructor() {
        this.listenerOnLogoutCompleted = new ListListener();
        this.listenerOnLoading = new ListListener();
        this.listenerShowError = new ListListener();
    }
    
    unsubscribeOnLogoutCompleted(func) {
        this.listenerOnLogoutCompleted.unsubscribe(func);
    }

    subscribeOnLogoutCompleted(func) {
        this.listenerOnLogoutCompleted.subscribe(func);
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

    logoutSession() {
        this.#onLoading(true);
        MainSessionRepository.closeLocalSession();
        this.#onLoading(false);
        this.#onLogoutSuccessful();
    }

    #onLoading(value) {
        this.listenerOnLoading.execute(value);
    }

    #onLogoutSuccessful() {
        this.listenerOnLogoutCompleted.execute();
    }

    #onError(error) {
        this.listenerShowError.execute(error);
    }
}