import ListListener from "../../../_commons/util/ListListenerContainer";
import delay from "../../../_commons/util/Delay";
import UserRepository from "../../../sessionManager/repository/UserRepository";

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
        this.#onLoading(true);
        await delay(1000);
        
        const user = UserRepository.getCurrentUser();
        user.completed_first_password = true;
        UserRepository.saveCurrentUser(user);
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