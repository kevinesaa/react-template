import SessionRepository from "../../../sessionManager/repository/SessionRepository";
import ListListener from "../../../_commons/util/ListListenerContainer";

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

    changePassword(token,newPass,confirmPass) {

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