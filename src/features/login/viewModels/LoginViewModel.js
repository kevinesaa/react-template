import CompanyRepository from "../../../sessionManager/repository/CompanyRepository";
import MainSessionRepository from "../../../sessionManager/repository/MainSessionRepository";
import SessionRepository from "../../../sessionManager/repository/SessionRepository";
import StringsUtil from "../../../_commons/util/StringsUtil";


export default class LoginViewModel
{

    constructor() {
        this.listenerOnLoading = [];
        this.listenerShowError = [];
        this.listenerLoginSuccessful = [];
    }

    unsubscribeOnLoading(func) {
        this.listenerOnLoading = this.listenerOnLoading.filter( f => f !== func);
    }

    subscribeOnLoading(func) {
        this.listenerOnLoading.push(func);
    }

    unsubscribeOnShowError(func) {
        this.listenerShowError = this.listenerShowError.filter( f => f !== func);
    }

    subscribeOnShowError(func)
    {
        this.listenerShowError.push(func);
    }

    unsubscribeOnLoginSuccessful(func) {
        this.listenerLoginSuccessful = this.listenerLoginSuccessful.filter( f => f !== func);
    }

    subscribeOnLoginSuccessful(func) {
        this.listenerLoginSuccessful.push(func);
    }

    async loginWithMail(email,pass) {

        

        if((!StringsUtil.isString(email) || StringsUtil.isEmptyOrNull(email))
            || (!StringsUtil.isString(pass) || StringsUtil.isEmptyOrNull(pass))) 
        {
            
            this.#onError({errorCode:"REQUIRE_EMAIL_AND_PASS"});
        }
        else {

            this.#onLoading(true);
            const response = await this.#makeLoginRequest(email,pass);
            this.#onLoading(false);
            if (response.status != 200)
            {
                this.#onError({errorCode:"fail_request"});
               
            }
            else 
            {
                const token = response?.data?.token;
                if(token == null) {
                    this.#onError({errorCode:"NOT_FOUND_TOKEN"});
                    return ;
                }
                
                MainSessionRepository.saveSession({token, data:response.data.data})
                this.#onLoginSuccessful();
            }
            
        }
    }

    #onLoading(value) {
        this.listenerOnLoading?.forEach(callback => callback(value));
    }

    #onLoginSuccessful() {
        this.listenerLoginSuccessful?.forEach( callback => callback());
    }

    #onError(error) {
        this.listenerShowError?.forEach( callback => callback(error));
    }

    #delay(milliseconds){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }

    async #makeLoginRequest(email,pass){
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

    
}

