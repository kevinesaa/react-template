import axios from 'axios';
import ListListener from "../../../_commons/util/ListListenerContainer";
import SessionRepository from "../../../sessionManager/repository/SessionRepository";
import ErrorCodes from "../../../_commons/InternalErrorCodes";
import API_END_POINTS from '../../../_commons/Api';
import CompanyRepository from '../../../sessionManager/repository/CompanyRepository';
import PermissionRepository from '../../../sessionManager/repository/PermissionsRepository';
import Constants from '../../../_commons/Constants';
import Permissions from '../../../_commons/Permissions';
import CompanyAndPermissionsRepository from '../../../sessionManager/repository/CompanyAndPermissionsRepository';


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
        
        const companies = CompanyAndPermissionsRepository.getCompaniesByPermissons([Permissions.ID_ALL_PERMISSIONS,Permissions.ID_SEE_DOCUMENTS_PERMISSION]);
        
        this.listenerOnCompanyData.execute(companies.sort((a,b) => a.id - b.id));
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
        
        const company = `company_id=${requestModel.companyId}`;
        const page = `page=${requestModel.page}`;
        let url = `${API_END_POINTS.GET_DOCUMENT_LIST}?${company}&${page}`;
        
        if(requestModel.doc_type_id) {
            const docType = `doc_type_id=${requestModel.doc_type_id}`;
            url = url.concat(docType);
        }

        if(requestModel.status) {
            const status = `status=${requestModel.status}`;
            url = url.concat(status);
        }
        
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