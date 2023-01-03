import ListListener from "../../../_commons/util/ListListenetContainer";


export default class DocumentsViewModel
{
    constructor() {
        this.listenerOnLoading = [];
        this.listenerShowError = [];
        this.listenerOnDocumentsData = [];
        this.listenerOnCompanyData = new ListListener();
        this.listenerOnPageInfoData = new ListListener();
        
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

    subscribeOnShowError(func) {
        this.listenerShowError.push(func);
    }

    unsubscribeOnDocumentsData(func) {
        this.listenerOnDocumentsData = this.listenerOnDocumentsData.filter( f => f !== func);
    }

    subscribeOnDocumentsData(func) {
        this.listenerOnDocumentsData.push(func);
    }

    unsubscribeOnCompanyData(func) {
        this.listenerOnCompanyData.unsubscribe(func);
    }

    subscribeOnCompanyData(func) {
        this.listenerOnCompanyData.subscribe(func);
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
        
        if(company != null && company.id != null) {
            this.#onLoading(true);
            const response = await this.#simulateRequest(company,filters);
            this.#onLoading(false);
            if (response.statusCode != 200)
            {
                this.#onError({errorMessage:""});
            }
            else 
            {
                const responseData = response.data ? response.data : {};
                const documents =  responseData.documents ? responseData.documents:[];
                const pagination = responseData.pagination ? responseData.pagination: {currentPage:1, totalItems: documents.length}
                this.#onPageInfoData(pagination);
                this.#onLoadDocumentsData(documents);
            }
        }
    }
    
    #onLoading(value) {
        this.listenerOnLoading?.forEach(callback => callback(value));
    }
    
    #onError(error) {
        this.listenerShowError?.forEach( callback => callback(error));
    }

    #onLoadDocumentsData(documents) {
        this.listenerOnDocumentsData?.forEach( callback => callback(documents));
    }

    #onPageInfoData(pageInfo) {
        this.listenerOnPageInfoData.execute(pageInfo);
    }

    async #simulateRequest() {
        await this.#delay(1000);
        const items = [
            {tipo_documento:2,detail:{}},{tipo_documento:1,detail:{}},{tipo_documento:2,detail:{}},{tipo_documento:1,detail:{}},{tipo_documento:2,detail:{}},{tipo_documento:1,detail:{}}
        ];
        return { 
            statusCode:200,
            data:{
                documents:items,
                pagination:{
                    currentPage: 1,
                    limit: 30,
                    maxPages: 0,
                    totalItems: items.length,
                    skip: 0
                }
        }};
    }

    #delay(milliseconds){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }
}