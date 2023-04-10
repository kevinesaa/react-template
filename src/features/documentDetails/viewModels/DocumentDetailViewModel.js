import axios from 'axios';
import SessionRepository from "../../../sessionManager/repository/SessionRepository";
import API_END_POINTS from '../../../_commons/Api';
import ErrorCodes from "../../../_commons/InternalErrorCodes";
import ListListener from "../../../_commons/util/ListListenerContainer";



export default class DocumentDetailViewModel {

    constructor() {
        this.listenerOnDocumentDetailData = new ListListener();
        this.listenerOnLoading = new ListListener();
        this.listenerShowError = new ListListener();
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

    unsubscribeOnDocumentDetailData(func) {
        this.listenerOnDocumentDetailData.unsubscribe(func);
    }

    subscribeOnDocumentDetailData(func) {
        this.listenerOnDocumentDetailData.subscribe(func);
    }

    async requestDocumentDetails(companyId,documentId) 
    {
        if(!SessionRepository.isHaveSessionToken()) 
        {
            this.#onError({errorCode:ErrorCodes.MISSING_TOKEN});
        }
        else 
        {
            const token = SessionRepository.getSessionToken();
            this.#onLoading(true);
            const response = await this.#makeDocumentDetailRequest({
                token,
                companyId,
                documentId
            });
            
            
            this.#onLoading(false);
            if (response.status != 200)
            {
                if(response.status == 401) {
                    //this.#onError({errorCode:});
                   // return;
                }
                //todo
                this.#onError({errorCode:ErrorCodes.SOURCE_ERROR});
            }
            else 
            {
                if(response.data) {
                    this.#onDocumentDetailData(response.data.data)
                }
                else {
                    this.#onError({errorCode:"NOT_FOUNT"});
                }
            }
        }
        
    }

    #onLoading(value) {
        this.listenerOnLoading.execute(value);
    }
    
    #onError(error) {
        this.listenerShowError.execute(error);
    }
    
    #onDocumentDetailData(docDetails) 
    {
        this.listenerOnDocumentDetailData.execute(docDetails);
    }

    async #makeDocumentDetailRequest(requestModel) {
        
        const endpoint = API_END_POINTS.GET_DOCUMENT_DETAIL;
        const company = `company_id=${requestModel.companyId}`;
        const docId = `document_id=${requestModel.documentId}`;
        const url = `${endpoint}?${company}&${docId}`;
        
        try{
            
            const response = await axios.get(url, { 
                headers:{
                    "Authorization": `Bearer ${requestModel.token}`,
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