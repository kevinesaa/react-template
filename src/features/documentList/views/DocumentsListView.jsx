import { Component } from "react";

import * as MaterialUI from "@mui/material";
import Dropdown from "../../../_commons/views/Dropdown";
import TableHeader from "../../../_commons/views/tableComponents/TableHeader";


export default class DocumentsListView extends Component 
{
    constructor(props) {
        super(props);
        this.state = {loading:false, companies:[]};
        this.handledOnSelectCompany = this.handledOnSelectCompany.bind(this);
        this.setCompanies = this.setCompanies.bind(this);
        this.showDocumentsList = this.showDocumentsList.bind(this);
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

    onError(error) {
        console.log("ah que chimbo!")
    }

    showLoading(value) {
        this.setState ({loading : value});
    }
    
    handledOnSelectCompany(company) {
        this.viewModel.requestDocuments(company,{page:1});
    }

    componentDidMount() {
        this.viewModel.subscribeOnCompanyData(this.setCompanies);
        this.viewModel.subscribeOnLoading(this.showLoading);
        this.viewModel.subscribeOnShowError(this.onError);

        this.viewModel.requestCompanies();
    }

    componentWillUnmount() {
        this.viewModel.unsubscribeOnCompanyData(this.setCompanies);
        this.viewModel.unsubscribeOnLoading(this.showLoading);
        this.viewModel.unsubscribeOnShowError(this.onError);
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

                                </MaterialUI.TableBody>
                            </MaterialUI.Table>
                        </MaterialUI.TableContainer>
                    </MaterialUI.Box>
                </MaterialUI.Box>
            </MaterialUI.Paper>
        );
    }
}