import axios from 'axios';
import API_END_POINTS from "../../_commons/Api";
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
        const url = API_END_POINTS.VERIFY_TOKEN_SESSION;
        try{
            
            const response = await axios(url, { 
                method: 'post',
                headers:{
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            
            return response;
        }
        catch(error) {
            console.error(error);
            return error.response;
        }
    }

    
}