import { Component } from "react";

import * as MaterialUI from "@mui/material";
import Dropdown from "../../../_commons/views/Dropdown";
import TableHeader from "../../../_commons/views/tableComponents/TableHeader";
import DocumentTableRow from "./tableRowHolder/DocumentTableRow";
import DocumentsTableAdapter from "./DocumentsTableAdapter";

export default class DocumentsListView extends Component 
{
    constructor(props) {
        super(props);
        this.state = {loading:false, companies:[], currentCompany: {},currentPage:0, totalItems:0,documents:[]};
        this.handledOnSelectCompany = this.handledOnSelectCompany.bind(this);
        this.handleOnChangePage = this.handleOnChangePage.bind(this);
        this.setCompanies = this.setCompanies.bind(this);
        this.showDocumentsList = this.showDocumentsList.bind(this);
        this.showPageInfo = this.showPageInfo.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.onError = this.onError.bind(this);
        this.viewModel = props.viewModel;
        this.columns = [
                {title:"Tipo"},
                {title:"Nro. Documento"},
                {title:"Monto"},
                {title:"Monto editado"},
                {title:"Moneda"},
                {title:"Banco"}, 
                {title:"Cliente"}, 
                {title:"Código - Cliente"},
                {title:"RIF - Cliente"},
                {title:"Vendedor"},
                {title:"Ruta"}, 
                {title:"Estatus"},
                {title:"Fecha - Conciliación"}
            ];
        
    }

    setCompanies(companies) {

        this.setState({companies});
    }

    showDocumentsList(documents) {

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

    handleOnChangePage (event, newPage) {
        
        this.setState ({currentPage:newPage});
        this.viewModel.requestDocuments(this.state.currentCompany,{page:newPage + 1});
    }

    componentDidMount() {
        this.viewModel.subscribeOnCompanyData(this.setCompanies);
        this.viewModel.subscribeOnLoading(this.showLoading);
        this.viewModel.subscribeOnShowError(this.onError);
        this.viewModel.subscribeOnPageInfoData(this.showPageInfo);

        this.viewModel.requestCompanies();
    }

    componentWillUnmount() {
        this.viewModel.unsubscribeOnCompanyData(this.setCompanies);
        this.viewModel.unsubscribeOnLoading(this.showLoading);
        this.viewModel.unsubscribeOnShowError(this.onError);
        this.viewModel.unsubscribeOnPageInfoData(this.showPageInfo);
    }

    render(){
        return (
            <MaterialUI.Paper
                elevation={2}
                sx={{
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: "5px",
                    pb: 5,
                }}
            >
                {this.state.loading && <h2>loading</h2>}
                <MaterialUI.Grid item sx={{ pt: 2, pl: 2 }}>
                    <MaterialUI.Typography variant="subtitles">Aqui va el texto del subtitulo</MaterialUI.Typography>
                </MaterialUI.Grid>
                <MaterialUI.Divider variant="middle"/>
                
                {/* Select Company */}
                <MaterialUI.Box sx={{ p: 2 }}>
                    
                    <MaterialUI.Stack direction={{ xs: "column", sm: "row" }}>
                        <MaterialUI.Grid
                            container
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center">

                            <Dropdown 
                                id="drop-company" 
                                label="Compañias"
                                onSelectItem={this.handledOnSelectCompany}
                                defaultValue={""}
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
                                
                                <MaterialUI.TableBody>
                                    <DocumentsTableAdapter items={[{tipo_documento:2,detail:{}},{tipo_documento:1,detail:{}},{tipo_documento:2,detail:{}},{tipo_documento:1,detail:{}},{tipo_documento:2,detail:{}},{tipo_documento:1,detail:{}}]}/>
                                </MaterialUI.TableBody>
                                
                            </MaterialUI.Table>
                            
                        </MaterialUI.TableContainer>
                        
                        <MaterialUI.TablePagination
                                rowsPerPageOptions={[
                                    30,
                                    //{ value: -1, label: "Todas" },
                                ]}
                                component="div" 
                                count={this.state.totalItems}
                                rowsPerPage={30}
                                page={this.state.currentPage}
                                onPageChange={this.handleOnChangePage}
                            />

                    </MaterialUI.Box>
                </MaterialUI.Box>
            </MaterialUI.Paper>
        );
    }
}