export default class ActionSAM {

    constructor(obj,methodName){
        this.obj = obj;
        this.methodName = methodName;
        console.log(methodName);
    }

    execute(value) {
        console.log(this.obj);
        console.log(this.methodName);
        this.obj[this.methodName](value);
    }
}
