import ListListener from "../../../_commons/util/ListListenerContainer";


export default class ChangePasswordViewModel {

    constructor() {
        this.listenerOnLoading = new ListListener();
        this.listenerShowError = new ListListener();
        this.listenerOnChangePassSuccessful = new ListListener();
    }
}