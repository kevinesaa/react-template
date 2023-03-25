import axios from 'axios';
import ListListener from "../../../_commons/util/ListListenerContainer";
import SessionRepository from "../../../sessionManager/repository/SessionRepository";
import ErrorCodes from "../../../_commons/InternalErrorCodes";
import API_END_POINTS from '../../../_commons/Api';
import Permissions from '../../../_commons/Permissions';
import CompanyAndPermissionsRepository from '../../../sessionManager/repository/CompanyAndPermissionsRepository';


export default class DocumentsViewModel
{
    constructor() {
        this.selectedCompany = undefined;
        this.listenerOnLoadingDocuments = new ListListener();
        this.listenerShowError = new ListListener();
        this.listenerOnDocumentsData = new ListListener();
        this.listenerOnCompanyData = new ListListener();
        this.listenerOnSelectCompany = new ListListener();
        this.listenerOnPageInfoData = new ListListener();
    }

    unsubscribeOnLoadingDocuments(func) {
        this.listenerOnLoadingDocuments.unsubscribe(func);
    }

    subscribeOnLoadingDocuments(func) {
        this.listenerOnLoadingDocuments.subscribe(func);
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

    async requestDocumentOptions() {
        
        const companies = CompanyAndPermissionsRepository.getCompaniesByPermissons([Permissions.ID_ALL_PERMISSIONS,Permissions.ID_SEE_DOCUMENTS_PERMISSION]);
        
        this.listenerOnCompanyData.execute(companies.sort((a,b) => a.id - b.id));
    }

    async requestDocuments(company,params) {
        
        if(company != null && company.id != null) {
            
            const token = SessionRepository.getSessionToken();
            this.#onSelectCompany(company);
            this.#onLoadingDocuments(true);
            const response =  await this.#makeRequest({
                token,
                companyId:company.id, 
                page:params.page,
                orderByColumn:params.orderBy.column,
                orderByType:params.orderBy.order,
                filters:{
                    id:params.filters.id,
                    doc_type_id:params.filters.doc_type_id.id,
                    status:params.filters.status.id,
                    document_number: params.filters.document_number,
                    user_creation:params.filters.user_creation,
                }
            });
            
            this.#onLoadingDocuments(false);
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
    
    #onLoadingDocuments(value) {
        this.listenerOnLoadingDocuments.execute(value);
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
        
        const endpoint = "https://t3xbifs9f1.execute-api.us-east-1.amazonaws.com/v1/documentos/";
        //const endpoint = API_END_POINTS.GET_DOCUMENT_LIST;
        
        const company = `company_id=${requestModel.companyId}`;
        const page = `page=${requestModel.page}`;
        let url = `${endpoint}?${company}&${page}`;
        const filters = requestModel.filters;

        if(requestModel.orderByColumn) {
            const orderBy =`orderBy=${requestModel.orderByColumn}`;
            let orderType =`orderType=ASC`;
            if(requestModel.orderByType) {
                orderType =`orderType=${requestModel.orderByType}`;
            }
            url = `${url}&${orderBy}&${orderType}`;
        }

        if(filters.id) {
            const id = `&id=${filters.id}`;
            url = url.concat(id);
        }

        if(filters.doc_type_id) {
            const docType = `&doc_type_id=${filters.doc_type_id}`;
            url = url.concat(docType);
        }

        if(filters.status) {
            const status = `&status=${filters.status}`;
            url = url.concat(status);
        }
        
        if(filters.document_number) {
            const docNumer = `&document_number=${filters.document_number}`;
            url = url.concat(docNumer);
        }

        if(filters.user_creation) {
            const createdBy = `&user_creation=${filters.user_creation}`;
            url = url.concat(createdBy);
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