import axios from 'axios';
import ListListener from "../../../_commons/util/ListListenerContainer";
import SessionRepository from "../../../sessionManager/repository/SessionRepository";
import ErrorCodes from "../../../_commons/InternalErrorCodes";
import API_END_POINTS from '../../../_commons/Api';
import Permissions from '../../../_commons/Permissions';
import CompanyAndPermissionsRepository from '../../../sessionManager/repository/CompanyAndPermissionsRepository';


export default class DocumentsViewModel
{
    #selectedCompany;
    #listenerOnLoadingDocuments;
    #listenerOnLoadingDocumentsOptions;
    #listenerShowError;
    #listenerOnDocumentsData;
    #listenerOnCompanyData;
    #listenerOnSelectCompany;
    #listenerOnPageInfoData;
    #listenerOnDownloadReport;

    constructor() {
        this.#selectedCompany = undefined;
        this.#listenerOnLoadingDocuments = new ListListener();
        this.#listenerShowError = new ListListener();
        this.#listenerOnDocumentsData = new ListListener();
        this.#listenerOnCompanyData = new ListListener();
        this.#listenerOnSelectCompany = new ListListener();
        this.#listenerOnPageInfoData = new ListListener();
        this.#listenerOnDownloadReport = new ListListener();
        this.#listenerOnLoadingDocumentsOptions = new ListListener();
    }

    unsubscribeOnLoadingDocuments(func) {
        this.#listenerOnLoadingDocuments.unsubscribe(func);
    }

    subscribeOnLoadingDocuments(func) {
        this.#listenerOnLoadingDocuments.subscribe(func);
    }

    unsubscribeOnLoadingDocumentsOptions(func) {
        this.#listenerOnLoadingDocumentsOptions.unsubscribe(func);
    }

    subscribeOnLoadingDocumentsOptions(func) {
        this.#listenerOnLoadingDocumentsOptions.subscribe(func);
    }

    unsubscribeOnShowError(func) {
        this.#listenerShowError.unsubscribe(func);
    }

    subscribeOnShowError(func) {
        this.#listenerShowError.subscribe(func);
    }

    unsubscribeOnDocumentsData(func) {
        this.#listenerOnDocumentsData.unsubscribe(func);
    }

    subscribeOnDocumentsData(func) {
        this.#listenerOnDocumentsData.subscribe(func);
    }

    unsubscribeOnCompanyData(func) {
        this.#listenerOnCompanyData.unsubscribe(func);
    }

    subscribeOnCompanyData(func) {
        this.#listenerOnCompanyData.subscribe(func);
    }

    unsubscribeOnSelectCompany(func) {
        this.#listenerOnSelectCompany.unsubscribe(func);
    }

    subscribeOnSelectCompany(func) {
        this.#listenerOnSelectCompany.subscribe(func);
    }

    unsubscribeOnPageInfoData(func) {
        this.#listenerOnPageInfoData.unsubscribe(func);
    }

    subscribeOnPageInfoData(func) {
        this.#listenerOnPageInfoData.subscribe(func);
    }

    unsubscribeOnDownloadReport(func) {
        this.#listenerOnDownloadReport.unsubscribe(func);
    }

    subscribeOnDownloadReport(func) {
        this.#listenerOnDownloadReport.subscribe(func);
    }

    async requestDocumentOptions() {
        this.#onLoadingDocumentsOptions(true);
        const companies = CompanyAndPermissionsRepository.getCompaniesByPermissons([Permissions.ID_ALL_PERMISSIONS,Permissions.ID_SEE_DOCUMENTS_PERMISSION]);
        
        this.#listenerOnCompanyData.execute(companies.sort((a,b) => a.id - b.id));
        this.#onLoadingDocumentsOptions(false);
    }

    async requestDocuments(company,params) {
        
        if(company != null && company.id != null) {
            
            //todo validate session permission seeDocuments
            const token = SessionRepository.getSessionToken();
            this.#onSelectCompany(company);
            this.#onLoadingDocuments(true);
            const response =  await this.#makeDocumentsRequest({
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
                    create_date:params.filters?.create_date,
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

    async downloadDocuementsReports(company,params) {
        
        if(company != null && company.id != null) {
            
            
            const token = SessionRepository.getSessionToken();
            this.#onLoadingDocumentsOptions(true);
            
            const response =  await this.#makeRequestDownloadReport({
                token,
                companyId:company.id,
                orderByColumn:params.orderBy.column,
                orderByType:params.orderBy.order,
                filters:{
                    id:params.filters.id,
                    doc_type_id:params.filters.doc_type_id.id,
                    status:params.filters.status.id,
                    document_number: params.filters.document_number,
                    user_creation:params.filters.user_creation,
                    create_date:params.filters?.create_date,
                }
            });
            
            this.#onLoadingDocumentsOptions(false);
            
            if (response.status != 200) {
                
                this.#onError({errorCode:ErrorCodes.SOURCE_ERROR,
                    sourceErrorCode:response.data.app_status,
                    sourceErrorMessage:response.data.message
                });

            }
            else {
                const reportLink = response?.data?.data?.reportUrl;
                this.#listenerOnDownloadReport.execute(reportLink);
            }
            
        }
    }
    
    #onLoadingDocuments(value) {
        this.#listenerOnLoadingDocuments.execute(value);
    }

    #onLoadingDocumentsOptions(value) {
        this.#listenerOnLoadingDocumentsOptions.execute(value);
    }
    
    #onError(error) {
        this.#listenerShowError.execute(error);
    }
    
    #onSelectCompany(company) 
    {
        if((company == null && this.#selectedCompany != null) 
            || (company != null && this.#selectedCompany == null)
            || (company.id != null && company.id !== this.#selectedCompany.id)
          ) 
        {
            this.#selectedCompany = company;
            this.#listenerOnSelectCompany.execute(company);
        }
        
    }

    #onLoadDocumentsData(documents) {
        this.#listenerOnDocumentsData.execute(documents);
    }

    #onPageInfoData(pageInfo) {
        this.#listenerOnPageInfoData.execute(pageInfo);
    }

    async #makeRequestDownloadReport(requestModel) {

        const endpoint = API_END_POINTS.GET_DOCUMENT_REPORT;
        const url = `${this.#buildParams(endpoint,requestModel)}`;
        return await this.#makeRequest(url,requestModel.token);
    }

    async #makeDocumentsRequest(requestModel) {
        
        const endpoint = API_END_POINTS.GET_DOCUMENT_LIST;
        const page = `page=${requestModel.page}`;
        const url = `${this.#buildParams(endpoint,requestModel)}&${page}`;
        return await this.#makeRequest(url,requestModel.token);
    }

    async #makeRequest(url,token) {
        
        try{

            const response = await axios.get(url, { 
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

    #buildParams(endpoint, requestModel) {
        
        const company = `company_id=${requestModel.companyId}`;
        const filters = requestModel.filters;
        let url = `${endpoint}?${company}`;

        if(requestModel.orderByColumn) {
            const orderBy =`orderBy=${requestModel.orderByColumn}`;
            let orderType =`orderType=ASC`;
            if(requestModel.orderByType) {
                orderType =`orderType=${requestModel.orderByType}`;
            }
            url = `${url}&${orderBy}&${orderType}`;
        }

        if(filters.id != null && filters.id.trim()) {
            const id = `&id=${filters.id.trim()}`;
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
        
        if(filters.document_number != null && filters.document_number.trim()) {
            const docNumer = `&document_number=${filters.document_number.trim()}`;
            url = url.concat(docNumer);
        }

        if(filters.user_creation != null && filters.user_creation.trim()) {
            const createdBy = `&user_creation=${filters.user_creation.trim()}`;
            url = url.concat(createdBy);
        }
        
        if(filters.create_date != null) {
            
            if(filters.create_date.start != null && filters.create_date.start.trim()) {
                const createDateStart = `&create_date_start=${filters.create_date.start.trim()}`;
                url = url.concat(createDateStart);
            }
            
            if(filters.create_date.end && filters.create_date.end.trim()) {
                const createDateEnd = `&create_date_end=${filters.create_date.end.trim()}`;
                url = url.concat(createDateEnd);
            }
        }

        return url;
    }
}