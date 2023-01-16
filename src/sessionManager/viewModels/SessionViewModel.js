import ListListener from "../../_commons/util/ListListenerContainer";
import MainSessionRepository from "../repository/MainSessionRepository";
import SessionRepository from "../repository/SessionRepository";


export default class SessionViewModel
{
    constructor() {
        this.listenerOnLoading = new ListListener();
        this.listenerOnShowLogin = new ListListener();
        this.listenerOnShowHome = new ListListener();
    }

    unsubscribeOnShowHome(func) {
        this.listenerOnShowHome.unsubscribe(func);
    }

    subscribeOnShowHome(func) {
        this.listenerOnShowHome.subscribe(func);
    }

    unsubscribeOnShowLogin(func) {
        this.listenerOnShowLogin.unsubscribe(func);
    }

    subscribeOnShowLogin(func) {
        this.listenerOnShowLogin.subscribe(func);
    }

    unsubscribeOnLoading(func) {
        this.listenerOnLoading.unsubscribe(func);
    }

    subscribeOnLoading(func) {
        this.listenerOnLoading.subscribe(func);
    }

    async checkUserSession() {
        
        if(!SessionRepository.isHaveSessionToken()) 
        {
            this.#goToLogin();
            return;
        }
        const token = SessionRepository.getSessionToken();
        this.#onLoading(true);
        const response = await this.#makeSessionRequest(token);
        if (response.status != 200)
        {
            //this.#onError({errorCode:"fail_request"});
        }
        else 
        {
            MainSessionRepository.saveSession({token, data:response.data?.data});
            this.#goToHome();
        }
        this.#onLoading(false);
    }

    #onLoading(value) {
        this.listenerOnLoading.execute(value);
    }

    #goToLogin() {
        this.listenerOnShowLogin.execute();
    }

    #goToHome() {
        this.listenerOnShowHome.execute();
    }

    async #makeSessionRequest(token) {
        await this.#delay(1000);

        return { 
            status:200, 
            data: {
                token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55X2lkIjowLCJpYXQiOjE2NzAzNTQ4MTN9.-PrtTpgiconQkOjrZFyst7n2iLbaf1cYv0xYjlhVgRI",
                data:{
                    "user": {
                      "user_id": 2,
                      "userName": "alguien1",
                      "userLastName": null,
                      "email": "alguien@HOLA.COM"
                    },
                    "companies": [
                      {
                        "id": 0,
                        "name": "COMAPAÑIA0"
                      },
                      {
                        "id": 1,
                        "name": "COMAPAÑIA1"
                      }
                    ],
                    "permissions": [
                      {
                        "company_id": 1,
                        "company_name": "COMAPAÑIA0",
                        "permission_id": 4,
                        "permission_name": "see document"
                      },
                      {
                        "company_id": 2,
                        "company_name": "COMAPAÑIA1",
                        "permission_id": 3,
                        "permission_name": "disable"
                      },
                      {
                        "company_id": 2,
                        "company_name": "COMAPAÑIA1",
                        "permission_id": 2,
                        "permission_name": "created"
                      }
                    ]
                  }
                }
            };
    }

    #delay(milliseconds){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }
}