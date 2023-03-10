import { Component } from "react";

import * as MaterialUI from "@mui/material";
import Dropdown from "../../../_commons/views/Dropdown";
import TableHeader from "../../../_commons/views/tableComponents/TableHeader";
import DocumentsTableAdapter from "./DocumentsTableAdapter";
import DocumentDetailView from "../../documentDetails/views/DocumentDetailView";
import LoadingScreen from "../../../_commons/views/LoadingScreen";
import Strings from "../../../_Resources/strings/strings";
import Constants from "../../../_commons/Constants";

const DOCUMENT_PER_PAGE = Constants.REGISTER_PER_PAGE;

export default class DocumentsListView extends Component 
{
    constructor(props) {
        super(props);
        this.state = {currentDocument:{},seeDetail:false, loading:false, companies:[], currentCompany: '',currentPage:0, totalItems:0,documents:[]};
        this.handledOnSelectCompany = this.handledOnSelectCompany.bind(this);
        this.handleOnChangePage = this.handleOnChangePage.bind(this);
        this.handleOnDocumentClickListener = this.handleOnDocumentClickListener.bind(this);
        this.handleOnCloseDetails = this.handleOnCloseDetails.bind(this);
        this.setCompanies = this.setCompanies.bind(this);
        this.showDocumentsList = this.showDocumentsList.bind(this);
        this.showSelectCompany = this.showSelectCompany.bind(this);
        this.showPageInfo = this.showPageInfo.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.onError = this.onError.bind(this);
        this.viewModel = props.viewModel;
       
        this.columns = [
                {
                    id:'',
                    name:Strings.documents_list_column_id},
                {
                    id:'',
                    name:Strings.documents_list_column_doc_type},    
                {
                    id:'',
                    name:Strings.documents_list_column_doc_number},
                {
                    id:'',
                    name:Strings.documents_list_column_date_conciliated},
                {
                    id:'',
                    name:Strings.documents_list_column_status},
                {
                    id:'',
                    name:Strings.documents_list_column_created_by},
                {
                    id:'',
                    name:Strings.documents_list_column_zone},
                {
                    id:'',
                    name:Strings.documents_list_column_document_date},
                {
                    id:'',
                    name:Strings.documents_list_column_document_ref},
                {
                    id:'',
                    name:Strings.documents_list_column_document_amount},
                {
                    id:'',
                    name:Strings.documents_list_column_document_edit_amount},
                {
                    id:'',
                    name:Strings.documents_list_column_document_bank_name}, 
                {
                    id:'',
                    name:Strings.documents_list_column_document_bank_account_number},
                {
                    id:'',
                    name:Strings.documents_list_column_document_client_code}
            ];
    }

    showSelectCompany(company){
        
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
    
    showLoading(value) {
        this.setState ({loading : value});
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
        this.viewModel.subscribeOnLoading(this.showLoading);
        this.viewModel.subscribeOnShowError(this.onError);
        this.viewModel.subscribeOnDocumentsData(this.showDocumentsList);
        this.viewModel.subscribeOnPageInfoData(this.showPageInfo);
        this.viewModel.subscribeOnSelectCompany(this.showSelectCompany);
        
        this.viewModel.requestCompanies();
    }

    componentWillUnmount() {
        this.viewModel.unsubscribeOnCompanyData(this.setCompanies);
        this.viewModel.unsubscribeOnLoading(this.showLoading);
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
                        <MaterialUI.TableContainer sx={{ maxHeight: 440 }}>
                            <MaterialUI.Table
                                sx={{ minWidth: 700 }}
                                stickyHeader
                                aria-label="sticky table"
                                size="small">
                                
                                <TableHeader columns={this.columns}></TableHeader>
                                
                                {this.state.documents.length === 0?<></>:
                                    <MaterialUI.TableBody>
                                        <DocumentsTableAdapter
                                            onItemClickListener={this.handleOnDocumentClickListener}
                                            items={this.state.documents}
                                        />
                                    </MaterialUI.TableBody>
                                }
                            </MaterialUI.Table>
                            
                        </MaterialUI.TableContainer>
                        
                        {this.state.documents.length === 0?<></>:
                           <MaterialUI.TablePagination
                                rowsPerPageOptions={[
                                    DOCUMENT_PER_PAGE,
                                    //{ value: -1, label: "Todas" },
                                ]}
                                component="div" 
                                count={this.state.totalItems}
                                rowsPerPage={DOCUMENT_PER_PAGE}
                                page={this.state.currentPage}
                                onPageChange={this.handleOnChangePage}
                            />
                        }
                    </MaterialUI.Box>
                </MaterialUI.Box>
            </MaterialUI.Paper>
            {
                !this.state.seeDetail?<></>:
                <DocumentDetailView
                    viewModel={this.props.detailViewModel}
                    handleClose={this.handleOnCloseDetails}
                    open={this.state.seeDetail}
                    document={this.state.currentDocument}
                    company={this.state.currentCompany}
                />
            }
            <LoadingScreen loading={this.state.loading}/>
        </>);
    }
}