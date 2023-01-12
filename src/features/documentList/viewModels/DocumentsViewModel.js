import ListListener from "../../../_commons/util/ListListenerContainer";
import axios from 'axios';
import SessionRepository from "../../../sessionManager/repository/SessionRepository";
import ErrorCodes from "../../../_commons/InternalErrorCodes";
const BASE_URL = process.env.REACT_APP_REMOTE_API_BASE_URL;
export default class DocumentsViewModel
{
    constructor() {
        this.selectedCompany = undefined;
        this.listenerOnLoading = new ListListener();
        this.listenerShowError = new ListListener();
        this.listenerOnDocumentsData = new ListListener();
        this.listenerOnCompanyData = new ListListener();
        this.listenerOnSelectCompany = new ListListener();
        this.listenerOnPageInfoData = new ListListener();
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

    unsubscribeOnDocumentsData(func) {
        this.listenerOnDocumentsData.unsubscribe(func);
    }

    subscribeOnDocumentsData(func) {
        this.listenerOnDocumentsData.subscribe(func);
    }

    unsubscribeOnCompanyData(func) {
        this.listenerOnCompanyData.unsubscribe(func);
    }

    subscribeOnCompanyData(func) {
        this.listenerOnCompanyData.subscribe(func);
    }

    unsubscribeOnSelectCompany(func) {
        this.listenerOnSelectCompany.unsubscribe(func);
    }

    subscribeOnSelectCompany(func) {
        this.listenerOnSelectCompany.subscribe(func);
    }

    unsubscribeOnPageInfoData(func) {
        this.listenerOnPageInfoData.unsubscribe(func);
    }

    subscribeOnPageInfoData(func) {
        this.listenerOnPageInfoData.subscribe(func);
    }

    async requestCompanies() {
        const companies = [{id:0,text:"empresa1"}, {id:1,text:"empresa2"}, {id:2,text:"empresa3"}];
        this.listenerOnCompanyData.execute(companies);
    }

    async requestDocuments(company,filters) {
        
        if(!SessionRepository.isHaveSessionToken()) {
            this.#onError({errorCode:ErrorCodes.MISSING_TOKEN});
        }
        else {

            if(company != null && company.id != null) {
                
                const token = SessionRepository.getSessionToken();
                this.#onSelectCompany(company);
                this.#onLoading(true);
                const response =  await this.#makeRequest({
                    token,
                    companyId:company.id, 
                    page:filters.page
                });
                
                this.#onLoading(false);
                if (response.status != 200)
                {
                    
                    this.#onError({errorCode:ErrorCodes.SOURCE_ERROR,
                        sourceErrorCode:response.data.app_status,
                        sourceErrorMessage:response.data.message
                    });
                }
                else 
                {
                    const responseData = response?.data?.data ? response?.data?.data : {};
                    const documents =  responseData.documents ? responseData.documents:[];
                    const pagination = responseData.pagination ? responseData.pagination: {currentPage:1, totalItems: documents.length}
                    this.#onPageInfoData(pagination);
                    this.#onLoadDocumentsData(documents);
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
    
    #onSelectCompany(company) 
    {
        if((company == null && this.selectedCompany != null) 
            || (company != null && this.selectedCompany == null)
            || (company.id != null && company.id !== this.selectedCompany.id)
          ) 
        {
            this.selectedCompany = company;
            this.listenerOnSelectCompany.execute(company);
        }
        
    }

    #onLoadDocumentsData(documents) {
        this.listenerOnDocumentsData.execute(documents);
    }

    #onPageInfoData(pageInfo) {
        this.listenerOnPageInfoData.execute(pageInfo);
    }

    async #makeRequest(requestModel) {
        try{

            const company = `company_id=${requestModel.companyId}`;
            const page = `page=${requestModel.page}`;
            let url = `${BASE_URL}/documentos?${company}&${page}`;
            
            if(requestModel.doc_type_id) {
                const docType = `doc_type_id=${requestModel.doc_type_id}`;
                url = url.concat(docType);
            }

            if(requestModel.status) {
                const status = `status=${requestModel.status}`;
                url = url.concat(status);
            }

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