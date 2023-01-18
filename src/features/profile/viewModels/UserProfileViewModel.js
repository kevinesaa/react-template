
import UserRepository from "../../../sessionManager/repository/UserRepository";
import ListListener from "../../../_commons/util/ListListenerContainer";

export default class UserProfileViewModel {

    constructor() {
        this.listenerOnLoading = new ListListener();
        this.listenerShowError = new ListListener();
        this.listenerOnUserInfo = new ListListener();
    }

    unsubscribeOnUserInfoCompleted(func) {
        this.listenerOnUserInfo.unsubscribe(func);
    }

    subscribeOnUserInfoCompleted(func) {
        this.listenerOnUserInfo.subscribe(func);
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

    async requestUserInfo() {
        const userData = UserRepository.getCurrentUser();
        this.#onUserData(userData);
    }

    #onUserData(userData) {
        this.listenerOnUserInfo.execute(userData);
    }

    #onLoading(value) {
        this.listenerOnLoading.execute(value);
    }

    #onError(error) {
        this.listenerShowError.execute(error);
    }
}