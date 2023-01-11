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
            if(response.data) {
                this.#onDocumentDetailData({...response.data})
            }
            else {
                this.#onError({errorMessage:""});
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
            data: {
                id_documento: "48",
                id_documento_afv: 60012,
                tipo_documento: 2,
                id_zona: 225,
                usuario_creacion: "v0053",
                estatus: 2,
                error: "DUPLICATE INSERT",
                update_at: "2023-01-06 14:24:42",
                detail: {
                        id_documento_afv: 60012,
                        ID_ZONA: 225,
                        FECHA_RECIBO: "2023-01-06T00:00:00.000Z",
                        USUARIO_CREACION: "v0053",
                        MONEDA: "USD",
                        ID_MONEDA: 100,
                        MONTO_DOLAR: "200.0000",
                        SOBRE_PAGO_DOLAR: "0.0000",
                        MONTO_LOCAL: "2999.9400",
                        SOBRE_PAGO_LOCAL: "520.7500",
                        FECHA_PAGO: "2023-01-02T00:00:00.000Z",
                        REFERENCIA: "0000000000",
                        FORMA_PAGO: "DEPOSITO $",
                        BANCO: "Ban",
                        NUMERO_CUENTA_BANCARIA: "00000000000000000000",
                        NOMBRE_ZONA: "Z053",
                        VENDEDOR: "MIGUEL",
                        DOCUMENTOS_ASOCIADOS: [
                            {
                                ID: 5266,
                                DOCUMENTO: "0000000",
                                MONTO_DOLAR: "200.0000",
                                MONTO_LOCAL: "3520.6900"
                            }
                        ],
                        CLIENTES: [
                            {
                                ID: 28309,
                                RIF_CLIENTE: "J000000000",
                                CODIGO_DE_CLIENTE: "00000000",
                                RAZON_SOCIAL_CLIENTE: "cliente"
                            }
                        ]
                    }
                }
        }
    }

    #fakeAnexo() {
        return {
            data:{
                id_documento: "227",
                id_documento_afv: 60012,
                tipo_documento: 1,
                id_zona: 75,
                usuario_creacion: "v0887",
                estatus: 2,
                error: "DUPLICATE INSERT",
                update_at: "2023-01-09 11:20:42",
                detail: {
                    id_documento_afv: 60012,
                    USUARIO_CREACION: "v0887",
                    ID_ZONA: 75,
                    NOMBRE_ZONA: "Z181",
                    VENDEDOR: "J",
                    FECHA_DOCUMENTO: "2023-01-08T00:00:00.000Z",
                    REFERENCIA: "00000000",
                    BANCO: "B",
                    NUMERO_CUENTA_BANCARIA: "0000000000000000000000",
                    ID_MONEDA: 100,
                    MONEDA: "USD",
                    MONTO: "1793.0000",
                    SOBRE_PAGO: "0.0000",
                    MONTO_EDITADO: null,
                    SOBRE_PAGO_EDITADO: "0.0000",
                    CLIENTES: [
                        {
                            ID: 15302,
                            RIF_CLIENTE: "J0000000000",
                            CODIGO_DE_CLIENTE: "00000000",
                            RAZON_SOCIAL_CLIENTE: "MULTISERVICIOS"
                        },
                        {
                            ID: 15331,
                            RIF_CLIENTE: "J0000000001",
                            CODIGO_DE_CLIENTE: "00000001",
                            RAZON_SOCIAL_CLIENTE: "INVERSIONES"
                        },
                        {
                            ID: 15304,
                            RIF_CLIENTE: "J0000000002",
                            CODIGO_DE_CLIENTE: "00000002",
                            RAZON_SOCIAL_CLIENTE: "RODAMIENTOS"
                        },
                        {
                            ID: 15326,
                            RIF_CLIENTE: "J0000000003",
                            CODIGO_DE_CLIENTE: "00000003",
                            RAZON_SOCIAL_CLIENTE: "MOTOR C.A."
                        }
                    ],
                    DOCUMENTOS_ASOCIADOS: [
                        {
                            MONTO: "440.0000",
                            DOCUMENTO: 60001,
                            MONTO_EDITADO: null
                        },
                        {
                            MONTO: "340.0000",
                            DOCUMENTO: 60003,
                            MONTO_EDITADO: null
                        },
                        {
                            MONTO: "208.0000",
                            DOCUMENTO: 60004,
                            MONTO_EDITADO: null
                        },
                        {
                            MONTO: "800.0000",
                            DOCUMENTO: 60005,
                            MONTO_EDITADO: null
                        },
                        {
                            MONTO: "5.0000",
                            DOCUMENTO: 60008,
                            MONTO_EDITADO: null
                        }
                    ]
                }
            }
        }
    }
}