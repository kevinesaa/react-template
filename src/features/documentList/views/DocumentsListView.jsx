import { Component, Fragment } from "react";

import * as MaterialUI from "@mui/material";
import DataTable from 'react-data-table-component';
import Dropdown from "../../../_commons/views/Dropdown";
import DocumentDetailView from "../../documentDetails/views/DocumentDetailView";
import LoadingScreen from "../../../_commons/views/LoadingScreen";
import Strings from "../../../_Resources/strings/strings";
import Constants from "../../../_commons/Constants";
import DropdownFilter from "../../../_commons/views/DropdownFilter";
import statusFilterValuesBuilder from "../../../_commons/views/filterValuesGenerators/StatusFilterValuesBuilder";
import documentTypeFilterValuesBuilder from "../../../_commons/views/filterValuesGenerators/documentTypeFilterValuesBuilder";
import DocumentStatusIds from "../../../_commons/DocumentStatusIds";
import DateRangeFilter from "../../../_commons/views/DateRangeFilter";


const DOCUMENT_PER_PAGE = Constants.REGISTER_PER_PAGE;
const FIRST_PAGE = 1;


const COLUMNS_IDS = Object.freeze([
    {table_id:'created_at',request_id:'create_date'},
    {table_id:'document_id', request_id:'id'},
    {table_id:'doc_type',request_id:'doc_type_id'},
    {table_id:'doc_number',request_id:'document_number'},
    {table_id:'conciliation_date',request_id:'conciliation_at'},
    {table_id:'status',request_id:'status'},
    {table_id:'created_by_code',request_id:'user_creation'},
    {table_id:'created_by_name',request_id:'seller_name'},
    {table_id:'zone',request_id:'zone_name'},
    {table_id:'document_date',request_id:'doc_date'},
    {table_id:'document_reference',request_id:'doc_ref'},
    {table_id:'document_amount',request_id:'amount'},
    {table_id:'document_edit_amount',request_id:'edit_amount'},
    {table_id:'bank',request_id:'bank_name'},
    {table_id:'bank_acc_number',request_id:'bank_account'},
    {table_id:'client_code',request_id:'client_code'},
].reduce((acc,item) => {
    acc[item.table_id]=item;
    return acc;
}, {} ));



export default class DocumentsListView extends Component 
{
    constructor(props) {
        
        super(props);
        const state = {
            currentDocument:{},
            firstRequest:false,
            seeDetail:false, 
            loading_options:false,
            loading_documents:false,
            companies:[], 
            documents:[],
            currentCompany: '',
            currentPage:FIRST_PAGE, 
            totalItems:0,
            itemsPerPage:DOCUMENT_PER_PAGE,
            
            filters_list:[
                {
                    id:"doc_create_date_filter",
                    name:Strings.text_created_date,
                    column:COLUMNS_IDS.created_at,
                    defualtValue:{start:'',end:''},
                    component:<DateRangeFilter
                        startDateLabel={Strings.documents_list_column_created_filter_start}
                        endDateLabel={Strings.documents_list_column_created_filter_end}
                        minDate={'2023-01-01'}
                        minDefault={'2023-01-01'}
                        maxDate={Date.now()}
                        maxDefault={Date.now()}
                        pickerWith={'27vh'} 
                        onRangeDateChange={(startDate, endDate) => {
                            this.handledOnFilterChange(COLUMNS_IDS.created_at.table_id,{start:startDate,end:endDate});
                        }}
                        />
                
                },
                {
                    id:"doc_id_filter",
                    name:Strings.documents_list_column_id,
                    column:COLUMNS_IDS.document_id,
                    defualtValue:'',
                    component:<MaterialUI.TextField
                        autoComplete="off"
                        sx={{ m: 1, width: "25vh" }}
                        label={Strings.documents_list_column_id}
                        size="small"
                        type={'number'}
                        InputProps={{ inputProps: { min: 1, type: 'number',} }}
                        onChange={event =>  {
                            let value = event.target.value;
                            value = value.replace(/^[^0-9]+/g, '');
                            this.handledOnFilterChange(COLUMNS_IDS.document_id.table_id,value)
                        }}
                        />
                
                },
                {
                    id:"status_filter",
                    name:Strings.text_status,
                    column:COLUMNS_IDS.status,
                    defualtValue:statusFilterValuesBuilder()[0],
                    component:<DropdownFilter
                        sx={{ m: 1, width: "25vh" }}
                        labelId={'filter-status'}
                        label={Strings.text_status}
                        defaultIndex={0}
                        values={statusFilterValuesBuilder()}
                        onSelectItem={ (value) => this.handledOnFilterChange(COLUMNS_IDS.status.table_id,value)}
                        />
                },
                {
                    id:"doc_type_filter",
                    name:Strings.documents_list_column_doc_type,
                    column:COLUMNS_IDS.doc_type,
                    defualtValue:documentTypeFilterValuesBuilder()[0],
                    component:<DropdownFilter 
                        sx={{ m: 1, width: "25vh" }}
                        labelId={'filter-doc-type'} 
                        label={Strings.documents_list_column_doc_type} 
                        defaultIndex={0} 
                        values={documentTypeFilterValuesBuilder()}
                        onSelectItem={ (value) => this.handledOnFilterChange(COLUMNS_IDS.doc_type.table_id,value)}/>
                },
                {
                    id:"doc_id_afv_document_filter",
                    name:Strings.documents_list_column_doc_number,
                    column:COLUMNS_IDS.doc_number,
                    defualtValue:'',
                    component:<MaterialUI.TextField
                        autoComplete="off"
                        sx={{ m: 1, width: "25vh" }}
                        label={Strings.documents_list_column_doc_number}
                        size="small"
                        onChange={event => this.handledOnFilterChange(COLUMNS_IDS.doc_number.table_id,event.target.value)}
                        />
                
                },
                {
                    id:"seller_code_filter",
                    name:Strings.documents_list_column_created_by_code,
                    column:COLUMNS_IDS.created_by_code,
                    defualtValue:'',
                    component:<MaterialUI.TextField
                        autoComplete="off"
                        sx={{ m: 1, width: "25vh" }}
                        label={Strings.documents_list_column_created_by_code}
                        size="small"
                        onChange={event => this.handledOnFilterChange(COLUMNS_IDS.created_by_code.table_id,event.target.value)}
                        />
                
                },
            ],
            selected_filters:[],
            filters:{},
            orderBy:{column:COLUMNS_IDS.created_at.request_id,order:'DESC'},
        };
        for(let f of state.filters_list) {
            state.filters[f.column.request_id] = f.defualtValue;
        }
        this.state = state;
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
        this.handledOnSortDocuments = this.handledOnSortDocuments.bind(this);
        this.onHandleSelectFilters = this.onHandleSelectFilters.bind(this);
        this.renderSelectedFilters = this.renderSelectedFilters.bind(this);
        this.handledOnFilterChange = this.handledOnFilterChange.bind(this);
        this.handledRequestDownloadReport = this.handledRequestDownloadReport.bind(this);
        this.showReportDownloadLink = this.showReportDownloadLink.bind(this);
        this.onError = this.onError.bind(this);
        this.viewModel = props.viewModel;
       
        this.columns = [
                {
                    id:COLUMNS_IDS.created_at.table_id,
                    name:Strings.text_created_date,
                    sortable: true,
                    selector:row=>row.create_at.substring(0,10),
                },
                {
                    id:COLUMNS_IDS.document_id.table_id,
                    name:Strings.documents_list_column_id,
                    sortable: true,
                    selector:row=>row.id_documento,
                },
                {
                    id:COLUMNS_IDS.doc_type.table_id,
                    name:Strings.documents_list_column_doc_type,
                    sortable: true,
                    selector: (row) => { 
                        return ( row.tipo_documento == Constants.DOC_TYPE_ANEXO_ID ?
                                    Strings.text_cash_document:
                                    row.tipo_documento == Constants.DOC_TYPE_RECIBO_ID?
                                    Strings.text_electronic_document:""
                            )
                        }
                },    
                {
                    id:COLUMNS_IDS.doc_number.table_id,
                    name:Strings.documents_list_column_doc_number,
                    sortable: true,
                    selector:row => row.id_documento_afv
                },
                {
                    id:COLUMNS_IDS.conciliation_date.table_id,
                    name:Strings.documents_list_column_date_conciliated,
                    selector:row => row.estatus < DocumentStatusIds.ON_CONCILIATION_COMPLETE ? "-":row.fecha_conciliacion?`${row.fecha_conciliacion.substring(0,10)}`: `${row.update_at.substring(0,10)}`
                },
                {
                    
                    id:COLUMNS_IDS.status.table_id,
                    name:Strings.documents_list_column_status,
                    sortable: true,
                    grow:2,
                    selector:row => Strings.text_status_by_id[ row.estatus ]
                },
                {
                    id:COLUMNS_IDS.created_by_code.table_id,
                    name:Strings.documents_list_column_created_by_code,
                    sortable: true,
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
                    selector:row => row.referencia != null ? row.referencia:row.detail?.REFERENCIA
                },
                {
                    id:COLUMNS_IDS.document_amount.table_id,
                    name:Strings.documents_list_column_document_amount,
                    selector:row => this.amountColumnSelector(row)
                },
                {
                    id:COLUMNS_IDS.document_edit_amount.table_id,
                    name:Strings.documents_list_column_document_edit_amount,
                    selector:row => row.detail?.MONTO_EDITADO == null ? "-":row.detail?.MONTO_EDITADO
                },
                {
                    id:COLUMNS_IDS.bank.table_id,
                    name:Strings.documents_list_column_document_bank_name,
                    selector:row => row.detail?.BANCO
                }, 
                {
                    id:COLUMNS_IDS.bank_acc_number.table_id,
                    name:Strings.documents_list_column_document_bank_account_number,
                    selector:row => row.detail?.NUMERO_CUENTA_BANCARIA
                },
                {
                    id:COLUMNS_IDS.client_code.table_id,
                    name:Strings.documents_list_column_document_client_code,
                    selector:row => row.detail?.CLIENTES.map(c => c.CODIGO_DE_CLIENTE).join(" ; ")
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
        
        this.setState({documents:documents,firstRequest:true});
    }

    handledRequestDownloadReport() {
        const company = this.state.currentCompany;
        const orderBy = this.state.orderBy;
        const filters = this.state.filters;
        const params = {filters,orderBy };
        this.viewModel.downloadDocuementsReports(company,params);
    }

    showReportDownloadLink(link) {
        console.log(link)
        window.open(link, '_blank', 'noreferrer');
    }
    
    handledOnFilterChange(columnTableId,filterValue) {
        
        const column = COLUMNS_IDS[columnTableId].request_id;
        const filters = {...this.state.filters};
        filters[column] = filterValue;
        this.setState({filters},() => {
            this.handleOnChangePage('',FIRST_PAGE);
        });
    }

    onHandleSelectFilters(event) {
        
        const selectedFiltersPrevState = this.state.selected_filters;
        const value = event.target.value;
        this.setState({selected_filters:value},() => {
            const selectedFiltersNewState = this.state.selected_filters;
            if(selectedFiltersNewState.length < selectedFiltersPrevState.length) {
                
                const filters = {...this.state.filters};
                const filterToClean = selectedFiltersPrevState.filter(item => !selectedFiltersNewState.map(it => it.id).includes(item.id));
                filterToClean.forEach(item => {
                    filters[item.column.request_id] = item.defualtValue;
                });

                this.setState({filters},() => {
                    this.handleOnChangePage('',FIRST_PAGE);
                });
            }
        });
    }

    showPageInfo(pageInfo) {
        
        this.setState({
            itemsPerPage:pageInfo.limit,
            totalItems:pageInfo.totalItems,
            currentPage:pageInfo.currentPage
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
        
        this.setState ({currentCompany : company }, () =>{
            
            this.handleOnChangePage ( 0,FIRST_PAGE);
        });
    }

    handledOnSortDocuments(selectedColumn,order,_) {
        
        const column = COLUMNS_IDS[selectedColumn.id].request_id;
        const orderBy = {column,order};
        this.setState ({orderBy}, () => {
            this.handleOnChangePage('',FIRST_PAGE); 
        });
    }

    handleOnChangePage ( _,newPage) {
        
        this.setState ({currentPage:newPage});
        const orderBy = this.state.orderBy;
        const filters = this.state.filters;
        const params = {page:newPage,filters,orderBy };
        this.viewModel.requestDocuments(this.state.currentCompany,params);
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
        this.viewModel.subscribeOnLoadingDocumentsOptions(this.showLoadingOptionsDocuments);
        this.viewModel.subscribeOnDownloadReport(this.showReportDownloadLink);

        this.viewModel.requestDocumentOptions();
    }

    componentWillUnmount() {
        this.viewModel.unsubscribeOnCompanyData(this.setCompanies);
        this.viewModel.unsubscribeOnLoadingDocuments(this.showLoadingDocuments);
        this.viewModel.unsubscribeOnShowError(this.onError);
        this.viewModel.unsubscribeOnDocumentsData(this.showDocumentsList);
        this.viewModel.unsubscribeOnPageInfoData(this.showPageInfo);
        this.viewModel.unsubscribeOnSelectCompany(this.showSelectCompany);
        this.viewModel.unsubscribeOnLoadingDocumentsOptions(this.showLoadingOptionsDocuments);
        this.viewModel.unsubscribeOnDownloadReport(this.showReportDownloadLink);
    }

    renderSelectedFilters(selectedValues) {
        
        return(<>
            <MaterialUI.Box
                sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                
                {selectedValues.map((item) => (
                    <MaterialUI.Chip
                        key={item.id}
                        label={item.name}/>
                ))}
            </MaterialUI.Box>
        </>);
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
                
                {/* company filter */}
                <MaterialUI.Box sx={{ ml: 2,mt:2, mb:1 }}>
                    
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
                        
                        { (this.state.documents.length > 0) && 
                            <MaterialUI.Button
                                onClick={this.handledRequestDownloadReport}
                                sx={{
                                    m:2,
                                    color: "white.main",
                                    textTransform: "none",
                                }}
                                size="small">{Strings.text_get_report}</MaterialUI.Button>
                        }
                        
                    </MaterialUI.Stack>
                </MaterialUI.Box>
                <MaterialUI.Box sx={{ flexGrow: 1, m: 3 }}>
                        

                    <MaterialUI.Grid container spacing={{ xs: 1, md: 1 }}>
                        {
                            this.state.selected_filters.length > 0 &&
                                this.state.selected_filters.reverse().map((item) => {
                                    const c = <Fragment key={item.id}>{item.component}</Fragment>;
                                    return c;
                                })
                        }
                    </MaterialUI.Grid>                       

                    <MaterialUI.FormControl sx={{ mt:1,minWidth: 150 }}>
                        <MaterialUI.InputLabel id={`label-select-general-documents-filters`}>
                            {Strings.text_filters}
                        </MaterialUI.InputLabel>
                        <MaterialUI.Select 
                            size="small"
                            autoWidth
                            labelId={`label-select-general-documents-filters`}
                            label={Strings.text_filters}
                            multiple={true}
                            onChange={this.onHandleSelectFilters}
                            renderValue={this.renderSelectedFilters}
                            value={this.state.selected_filters}>

                            {this.state.filters_list.length > 0 &&
                                this.state.filters_list.map(item => {
                                        return(
                                            <MaterialUI.MenuItem key={item.id} value={item}>
                                                {item.name}
                                            </MaterialUI.MenuItem>
                                        )}
                                    )
                                
                            }
                        </MaterialUI.Select>
                    </MaterialUI.FormControl>

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
                            paginationDefaultPage={this.state.currentPage}
                            paginationPerPage={this.state.itemsPerPage}
                            paginationTotalRows={this.state.totalItems}
                            paginationServer 
                            paginationComponentOptions={{
                                selectAllRowsItem:false,
                                noRowsPerPage:true
                            }}
                            sortServer
                            defaultSortAsc={false}
                            defaultSortFieldId={COLUMNS_IDS.created_at.table_id}
                            onSort={this.handledOnSortDocuments}
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