
export default class ListListener {

    constructor() {
        this.listeners = [];
        this.lastValue = {};
        this.firstExecute = false;
    }

    subscribe(func) {
        this.listeners.push(func);
        if(this.firstExecute) {
            func(this.lastValue);
        }
    }

    unsubscribe(func) {
        this.listeners = this.listeners.filter( f => f !== func);
    }

    execute(value) {
        this.lastValue = value;
        this.firstExecute = true;
        this.listeners?.forEach( callback => callback(value));
    }
}