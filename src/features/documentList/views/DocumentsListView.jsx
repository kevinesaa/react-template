import { Component } from "react";

import * as MaterialUI from "@mui/material";
import DataTable from 'react-data-table-component';
import Dropdown from "../../../_commons/views/Dropdown";
import DocumentDetailView from "../../documentDetails/views/DocumentDetailView";
import LoadingScreen from "../../../_commons/views/LoadingScreen";
import Strings from "../../../_Resources/strings/strings";
import Constants from "../../../_commons/Constants";

const DOCUMENT_PER_PAGE = Constants.REGISTER_PER_PAGE;

const COLUMNS_IDS = Object.freeze({
    created_at:{table_id:'created_at',request_id:'create_date'},
    document_id:{table_id:'document_id', request_id:'id'},
    doc_type:{table_id:'doc_type',request_id:'doc_type_id'},
    doc_number:{table_id:'doc_number',request_id:'document_number'},
    conciliation_date:{table_id:'conciliation_date',request_id:'conciliation_at'},
    status:{table_id:'status',request_id:'status'},
    created_by_code:{table_id:'created_by_code',request_id:'user_creation'},
    created_by_name:{table_id:'created_by_name',request_id:'seller_name'},
    zone:{table_id:'zone',request_id:'zone_name'},
    document_date:{table_id:'document_date',request_id:'doc_date'},
    document_reference:{table_id:'document_reference',request_id:'doc_ref'},
    document_amount:{table_id:'document_amount',request_id:'amount'},
    document_edit_amount:{table_id:'document_edit_amount',request_id:'edit_amount'},
    bank:{table_id:'bank',request_id:'bank_name'},
    bank_acc_number:{table_id:'bank_acc_number',request_id:'bank_account'},
    client_code:{table_id:'client_code',request_id:'client_code'},
});

export default class DocumentsListView extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
            currentDocument:{},
            firstRequest:false,
            seeDetail:false, 
            loading_options:false,
            loading_documents:false,
            companies:[], 
            documents:[],
            currentCompany: '',
            currentPage:1, 
            totalItems:0,
            itemsPerPage:DOCUMENT_PER_PAGE
        };
        this.handledOnSelectCompany = this.handledOnSelectCompany.bind(this);
        this.handleOnChangePage = this.handleOnChangePage.bind(this);
        this.handleOnDocumentClickListener = this.handleOnDocumentClickListener.bind(this);
        this.handleOnCloseDetails = this.handleOnCloseDetails.bind(this);
        this.setCompanies = this.setCompanies.bind(this);
        this.showDocumentsList = this.showDocumentsList.bind(this);
        this.showSelectCompany = this.showSelectCompany.bind(this);
        this.showPageInfo = this.showPageInfo.bind(this);
        this.showLoadingDocuments = this.showLoadingDocuments.bind(this);
        this.showLoadingOptionsDocuments = this.showLoadingOptionsDocuments.bind(this);
        this.amountColumnSelector = this.amountColumnSelector.bind(this);
        this.onError = this.onError.bind(this);
        this.viewModel = props.viewModel;
       
        this.columns = [
                {
                    id:COLUMNS_IDS.created_at.table_id,
                    name:Strings.text_created_date,
                    sortable: false,
                    selector:row=>row.create_at.substring(0,10),
                },
                {
                    id:COLUMNS_IDS.document_id.table_id,
                    name:Strings.documents_list_column_id,
                    sortable: false,
                    selector:row=>row.id_documento,
                },
                {
                    id:COLUMNS_IDS.doc_type.table_id,
                    name:Strings.documents_list_column_doc_type,
                    selector: (row) => { 
                        return ( row.tipo_documento == Constants.DOC_TYPE_ANEXO_ID ?
                                    Strings.text_electronic_document:
                                    row.tipo_documento == Constants.DOC_TYPE_RECIBO_ID?
                                    Strings.text_cash_document:""
                            )
                        }
                },    
                {
                    id:COLUMNS_IDS.doc_number.table_id,
                    name:Strings.documents_list_column_doc_number,
                    selector:row => row.detail.id_documento_afv
                },
                {
                    id:COLUMNS_IDS.conciliation_date.table_id,
                    name:Strings.documents_list_column_date_conciliated,
                    selector:row => row.estatus < 3?"-":row.fecha_conciliacion?`${row.fecha_conciliacion.substring(0,10)}`: `${row.update_at.substring(0,10)}`
                },
                {
                    
                    id:COLUMNS_IDS.status.table_id,
                    name:Strings.documents_list_column_status,
                    selector:row => Strings.text_status_by_id[ row.estatus ]
                },
                {
                    id:COLUMNS_IDS.created_by_code.table_id,
                    name:Strings.documents_list_column_created_by_code,
                    selector:row => row.usuario_creacion
                },/*
                {
                    id:COLUMNS_IDS.created_by_name.table_id,
                    name:Strings.documents_list_column_created_by_name,
                    selector:row => 
                },*/
                {
                    id:COLUMNS_IDS.zone.table_id,
                    name:Strings.documents_list_column_zone,
                    selector:row => row.detail?.NOMBRE_ZONA
                },
                {
                    id:COLUMNS_IDS.document_date.table_id,
                    name:Strings.documents_list_column_document_date,
                    selector:row => row.detail?.FECHA_DOCUMENTO.substring(0,10)
                },
                {
                    id:COLUMNS_IDS.document_reference.table_id,
                    name:Strings.documents_list_column_document_ref,
                    selector:row => row.referencia? row.referencia:row.detail?.REFERENCIA
                },
                {
                    id:COLUMNS_IDS.document_amount.table_id,
                    name:Strings.documents_list_column_document_amount,
                    selector:row => this.amountColumnSelector(row)
                },
                {
                    id:COLUMNS_IDS.document_edit_amount.table_id,
                    name:Strings.documents_list_column_document_edit_amount,
                    selector:row => row.tipo_documento == Constants.DOC_TYPE_ANEXO_ID ? "-" : row.detail.MONTO_EDITADO == null ? "-":row.detail.MONTO_EDITADO
                },
                {
                    id:COLUMNS_IDS.bank.table_id,
                    name:Strings.documents_list_column_document_bank_name,
                    selector:row => row.detail.BANCO
                }, 
                {
                    id:COLUMNS_IDS.bank_acc_number.table_id,
                    name:Strings.documents_list_column_document_bank_account_number,
                    selector:row => row.detail.NUMERO_CUENTA_BANCARIA
                },
                {
                    id:COLUMNS_IDS.client_code.table_id,
                    name:Strings.documents_list_column_document_client_code,
                    selector:row => row.detail.CLIENTES.map(c => c.CODIGO_DE_CLIENTE).join(" ; ")
                }
            ];
    }

    amountColumnSelector(row) {
        
        let amount = row.monto != null? row.monto:null;
        let currency = row.moneda_transaccion;

        if(currency == null) {
            currency = Strings.text_currencies_by_id[row.detail?.ID_MONEDA];
        }
        
        if (amount == null) {
            
            if(row.tipo_documento == Constants.DOC_TYPE_ANEXO_ID) {
                amount = row.detail?.MONTO;
            }

            if(row.tipo_documento == Constants.DOC_TYPE_RECIBO_ID) {
                amount = row.detail?.MONTO_DOLAR;
                if( row.detail.ID_MONEDA != Constants.ID_DOLLAR_CURRENCY)
                {
                    amount = row.detail.MONTO_LOCAL;
                }
            }
        }
        
        return `${Number(amount).toFixed(2)} ${currency}`;
    }

    showSelectCompany(company) {
        
        this.setState ({currentCompany : company});
    }

    setCompanies(companies) {
        
        this.setState({companies:companies.map(it => {return {id:it.id,text:it.name}})});
    }

    showDocumentsList(documents) {
        
        this.setState({documents:documents});
    }

    showPageInfo(pageInfo) {
        
        this.setState({
            totalItems:pageInfo.totalItems,
            currentPage:pageInfo.currentPage-1
        });
    }
    
    showLoadingOptionsDocuments(value) {
        this.setState ({loading_options : value});
    }

    showLoadingDocuments(value) {
        this.setState ({loading_documents : value});
    }

    onError(error) {
        console.error("ah que chimbo!");
        console.error(error);
    }
    
    handledOnSelectCompany(company) {
        this.setState ({currentCompany : company, currentPage:0});
        this.viewModel.requestDocuments(company,{page:1});
    }

    handleOnChangePage ( _,newPage) {
        
        this.setState ({currentPage:newPage});
        this.viewModel.requestDocuments(this.state.currentCompany,{page:newPage + 1});
    }

    handleOnDocumentClickListener(document) {
        
        this.setState ({currentDocument:document,seeDetail:true});
    }

    handleOnCloseDetails() {
        this.setState ({seeDetail:false});
    }

    componentDidMount() {
        this.viewModel.subscribeOnCompanyData(this.setCompanies);
        this.viewModel.subscribeOnLoadingDocuments(this.showLoadingDocuments);
        this.viewModel.subscribeOnShowError(this.onError);
        this.viewModel.subscribeOnDocumentsData(this.showDocumentsList);
        this.viewModel.subscribeOnPageInfoData(this.showPageInfo);
        this.viewModel.subscribeOnSelectCompany(this.showSelectCompany);
        
        this.viewModel.requestDocumentOptions();
    }

    componentWillUnmount() {
        this.viewModel.unsubscribeOnCompanyData(this.setCompanies);
        this.viewModel.unsubscribeOnLoadingDocuments(this.showLoadingDocuments);
        this.viewModel.unsubscribeOnShowError(this.onError);
        this.viewModel.unsubscribeOnDocumentsData(this.showDocumentsList);
        this.viewModel.unsubscribeOnPageInfoData(this.showPageInfo);
        this.viewModel.unsubscribeOnSelectCompany(this.showSelectCompany);
    }

    render(){
        return (
        <>
            <MaterialUI.Paper
                elevation={2}
                sx={{
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: "5px",
                    pb: 5,
                }}
            >
                
                <MaterialUI.Grid item sx={{ pt: 2, pl: 2 }}>
                    <MaterialUI.Typography variant="subtitles">{Strings.documents_list_title}</MaterialUI.Typography>
                </MaterialUI.Grid>
                <MaterialUI.Divider variant="middle"/>
                
                {/* filters */}
                <MaterialUI.Box sx={{ p: 2 }}>
                    
                    <MaterialUI.Stack direction={{ xs: "column", sm: "row" }}>
                        <MaterialUI.Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center">

                            <Dropdown 
                                id="drop-company" 
                                label={Strings.text_companies}
                                onSelectItem={this.handledOnSelectCompany}
                                defaultValue={this.state.currentCompany}
                                value={this.state.currentCompany}
                                items={this.state.companies}
                            />
                            
                            
                        </MaterialUI.Grid>

                    </MaterialUI.Stack>
                </MaterialUI.Box>
                
                {/* Tabla */}
                <MaterialUI.Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                    <MaterialUI.Box gridColumn="span 12">
                        
                        <DataTable 
                            columns={this.columns}
                            data={this.state.documents}
                            progressPending={this.state.loading_documents}
                            progressComponent={<MaterialUI.CircularProgress/> }
                            persistTableHead
                            noDataComponent={!this.state.firstRequest? "": (this.state.documents.length > 0 ? this.state.documents:Strings.text_not_data) }
                            striped
                            highlightOnHover
                            pointerOnHover 
                            pagination
                            paginationPerPage={this.state.itemsPerPage}
                            paginationTotalRows={this.state.totalItems}
                            paginationServer 
                            paginationComponentOptions={{
                                selectAllRowsItem:false,
                                noRowsPerPage:true
                            }}
                            sortServer
                            defaultSortFieldId={COLUMNS_IDS.created_at.table_id}
                            onSort={this.handledOnSortUsers}
                            onChangePage={(page,totalRows) => this.handleOnChangePage(totalRows,page)}
                            onRowClicked={this.handleOnDocumentClickListener} />
                        
                    </MaterialUI.Box>
                </MaterialUI.Box>
            </MaterialUI.Paper>
            {
                this.state.seeDetail &&
                <DocumentDetailView
                    viewModel={this.props.detailViewModel}
                    handleClose={this.handleOnCloseDetails}
                    open={this.state.seeDetail}
                    document={this.state.currentDocument}
                    company={this.state.currentCompany}
                />
            }
            
            <LoadingScreen loading={this.state.loading_options}/>

        </>);
    }
}