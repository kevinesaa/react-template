import MainSessionRepository from "../../../sessionManager/repository/MainSessionRepository";
import SessionRepository from "../../../sessionManager/repository/SessionRepository";
import ListListener from "../../../_commons/util/ListListenerContainer";

import delay from "../../../_commons/util/Delay";

export default class RestorePasswordViewModel {

    constructor() {
        this.listenerOnLoading = new ListListener();
        this.listenerShowError = new ListListener();
        this.listenerOnChangePassSuccessful = new ListListener();
        this.listenerOnSessionStatus = new ListListener();
    }

    unsubscribeOnSessionStatus(func) {
        this.listenerOnSessionStatus.unsubscribe(func);
    }

    subscribeOnSessionStatus(func) {
        this.listenerOnSessionStatus.subscribe(func);
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

    checkSession() {
        const hasSession = SessionRepository.isHaveSessionToken();
        this.listenerOnSessionStatus.execute(hasSession);
    }

    async changePassword(token,newPass,confirmPass) {
        
        this.#onLoading(true);
        await delay(1000);
        MainSessionRepository.closeLocalSession();
        this.#onLoading(false);
        this.#onChangePassSuccessful();
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
}