

export default class DocumentsViewModel
{
    constructor() {
        this.listenerOnLoading = [];
        this.listenerShowError = [];
        this.listenerOnDocumentsData = [];
        this.listenerOnCompanyData = [];
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
        this.listenerOnCompanyData = this.listenerOnDocumentsData.filter( f => f !== func);
    }

    subscribeOnCompanyData(func) {
        this.listenerOnCompanyData.push(func);
    }

    async requestCompanies() {
        const companies = [{id:0,text:"empresa1"}, {id:1,text:"empresa2"}, {id:2,text:"empresa3"}];
        this.listenerOnCompanyData?.forEach(callback => callback(companies));
    }

    async requestDocuments(company,filters) {
        
        if(company != null && company.id != null) {
            this.#onLoading(true);
            const response = await this.#simulateRequest(company,filters);
            this.#onLoading(false);
            if (response.statusCode == 200)
            {
                let documents = response.data?response.data : [];
                documents =  documents.documents?documents.documents:[];
                this.#onLoadDocumentsData(documents)
            }
            else 
            {
                this.#onError({errorMessage:""});
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

    async #simulateRequest() {
        await this.#delay(1000);
        return { 
            statusCode:200,
            data:{
                documents:[
                        {tipo_documento:2,detail:{}},{tipo_documento:1,detail:{}},{tipo_documento:2,detail:{}},{tipo_documento:1,detail:{}},{tipo_documento:2,detail:{}},{tipo_documento:1,detail:{}}
                ],
                pagination:{
                    currentPage: 1,
                    limit: 30,
                    maxPages: 0,
                    totalItems: 0,
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