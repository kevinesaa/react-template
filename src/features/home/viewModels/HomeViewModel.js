import UserRepository from "../../../sessionManager/repository/UserRepository";
import ListListener from "../../../_commons/util/ListListenerContainer";

export default class HomeViewModel {

    constructor() {
        this.listenerOnCheckFirstTimePass = new ListListener();
    }
    
    unsubscribeOnShowFirstTimePass(func) {
        this.listenerOnCheckFirstTimePass.unsubscribe(func);
    }

    subscribeOnShowFirstTimePass(func) {
        this.listenerOnCheckFirstTimePass.subscribe(func);
    }

    checkFirstPasswordState() {
        const user = UserRepository.getCurrentUser();
        if(user.new_user){
            this.listenerOnCheckFirstTimePass.execute(true);
        }
    }

}