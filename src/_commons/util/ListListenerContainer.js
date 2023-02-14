
export default class ListListener {

    constructor() {
        this.listeners = [];
        this.lastValue = {};
        this.firstExecuteCompleted = false;
    }

    subscribe(func) {
        if(func){
            this.listeners.push(func);
            if(this.firstExecuteCompleted) {
                //reactive is more complicated
                //func(this.lastValue);
            }
        }
    }

    unsubscribe(func) {
        if(func){
            this.listeners = this.listeners.filter( f => f !== func);
        }
    }

    execute(value) {
        this.lastValue = value;
        this.firstExecuteCompleted = true;
        this.listeners?.forEach( callback => callback(value));
    }
}