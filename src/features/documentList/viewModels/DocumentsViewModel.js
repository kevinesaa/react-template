import ListListener from "../../../_commons/util/ListListenerContainer";


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
        
        if(company != null && company.id != null) {
            this.#onSelectCompany(company);
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

    async #simulateRequest() {
        await this.#delay(1000);
        const items = [];

        for(let i=0; i<30; i++){
            const type = Math.floor(Math.random() * 2);
            const doc = type !== 0 ?this.#fakeRecibo():this.#fakeAnexo();
            items.push(doc);
        }

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

    #fakeRecibo() {
        return {
            id_documento:157,
            estatus:3, 
            casa:0, 
            tipo_documento:2,
            id_documento_afv: 2,
            id_zona:54,
            update_at:"2022-12-26 19:11:19",
            usuario_creacion:"k2110",
            detail:{
                id_documento_afv: 2,
                ID_ZONA: 54,
                FECHA_RECIBO: "2022-12-26",
                USUARIO_CREACION: "k2110",
                MONEDA: "VES",
                ID_MONEDA: 205,
                MONTO_DOLAR: "555.3500",
                MONTO_BS: "9207.0000", 
                FECHA_PAGO: "2022-10-25",
                NUMERO_REFERENCIA: "50958611",
                FORMA_PAGO: "TRANSFERENCIA BS",
                BANCO: "banko coyote",
                NUMERO_CUENTA_BANCARIA: "00000000000000000000",
                NOMBRE_ZONA: "Z154",
                VENDEDOR: "VENDEDOR 3",
                CLIENTES:[
                    {RIF_CLIENTE: "J000000000", CODIGO_DE_CLIENTE: "00000000", RAZON_SOCIAL_CLIENTE: "Empresa CA"},
                    {RIF_CLIENTE: "J000000000", CODIGO_DE_CLIENTE: "00000000", RAZON_SOCIAL_CLIENTE: "Empresa CA"}
                ]
        }};
    }

    #fakeAnexo(){
        return {
            id_documento:151,
            estatus:2, 
            casa:0, 
            tipo_documento:1,
            id_documento_afv: 1,
            id_zona:221,
            update_at:"2022-12-26 19:11:19",
            usuario_creacion:"k2110",
            detail:{
                id_documento_afv:1,
                ID_ZONA:1,
                FECHA_EMISION_ANEXO:"2022-12-26",
                NUMERO_DEPOSITO:"000000000",
                BANCO:"superbancko",
                NUMERO_CUENTA_BANCARIA:"00000000000000000000",
                ID_MONEDA:100,
                MONEDA:"USD",
                VENDEDOR:"VENDEDOR 3",
                NOMBRE_ZONA:"Z000",
                USUARIO_CREACION:"k2110",
                NRO_ANEXO_ZONA:"00000000",
                MONTO_ANEXO:"40.0000",
                MONTO_EDITADO:"40.0000",
                CLIENTES:[
                    {RIF_CLIENTE: "J000000000", CODIGO_DE_CLIENTE: "00000000", RAZON_SOCIAL_CLIENTE: "Empresa CA"},
                    {RIF_CLIENTE: "J000000000", CODIGO_DE_CLIENTE: "00000000", RAZON_SOCIAL_CLIENTE: "Empresa CA"}
                ]
        }};
    }
}