import ListListener from "../../../_commons/util/ListListenerContainer";

const ANEXO_TYPE_ID = 1;
const RECIBO_TYPE_ID = 2
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

    async requestDocumentDetails(companyId,document) {
        this.#onLoading(true);
        const response = await this.#simulateRequest(document.tipo_documento);
        this.#onLoading(false);
        if (response.statusCode != 200)
        {
            this.#onError({errorMessage:""});
        }
        else 
        {
            const list = response.data? (response.data.detail? response.data.detail:[]):[];
            document.detailList = list;
            this.#onDocumentDetailData({...document})
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

    async #simulateRequest(type) {
        await this.#delay(1000);
        const response = type === ANEXO_TYPE_ID ?
            this.#fakeAnexo():this.#fakeRecibo();

        return { 
            statusCode:200,
            data: response.data
        };
    }

    #delay(milliseconds){
        return new Promise(resolve => {
            setTimeout(resolve, milliseconds);
        });
    }

    #fakeRecibo() {
        return {
            data:{
                id_documento:157,
                estatus:3, 
                casa:0, 
                tipo_documento:2,
                id_documento_afv: 2,
                id_zona:54,
                update_at:"2022-12-26 19:11:19",
                usuario_creacion:"k2110",
                detail:[
                    {FACTURA:"00000001",ID_MONEDA:205,MONEDA:"VES",MONTO_DOLAR:"304.5500",MONTO_LOCAL:"5049.0200"},
                    {FACTURA:"00000001",ID_MONEDA:205,MONEDA:"VES",MONTO_DOLAR:"304.5500",MONTO_LOCAL:"5049.0200"},
                    {FACTURA:"00000001",ID_MONEDA:205,MONEDA:"VES",MONTO_DOLAR:"304.5500",MONTO_LOCAL:"5049.0200"}
                ]
            }
        }
    }

    #fakeAnexo() {
        return {
            data:{
                id_documento:151,
                estatus:2, 
                casa:0, 
                tipo_documento:1,
                id_documento_afv: 1,
                id_zona:221,
                update_at:"2022-12-26 19:11:19",
                usuario_creacion:"k2110",
                detail:[
                    {RECIBO:"00001", MONEDA:"USD",ID_MONEDA:100, MONTO:"40.0000"},
                    {RECIBO:"00001", MONEDA:"USD",ID_MONEDA:100, MONTO:"40.0000"},
                    {RECIBO:"00001", MONEDA:"USD",ID_MONEDA:100, MONTO:"40.0000"},
                    {RECIBO:"00001", MONEDA:"USD",ID_MONEDA:100, MONTO:"40.0000"}
                ]
            }
        }
    }
}