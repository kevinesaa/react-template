import React from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import * as MaterialUI from "@mui/material";
import LoadingScreen from "../../../_commons/views/LoadingScreen";
import ClientFromDocDetail from "./clientsSection/ClientFromDocDetail";
import AssociatedDocumentsAdapter from "./associatedDocumentsSecction/AssociatedDocumentsAdapter";

export default class DocumentDetailView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {loading:false, docDetail:{},showListDocument:true};
        this.document = props.document;
        this.company = props.company;
        this.viewModel = props.viewModel;

        this.showDocumentsDetails = this.showDocumentsDetails.bind(this);
        this.handleClickShowDocumentList = this.handleClickShowDocumentList.bind(this);
        
        this.showLoading = this.showLoading.bind(this);
        this.onError = this.onError.bind(this);
    }
    
    componentDidMount() {
        
        this.viewModel.subscribeOnLoading(this.showLoading);
        this.viewModel.subscribeOnShowError(this.onError);
        this.viewModel.subscribeOnDocumentDetailData(this.showDocumentsDetails);
        
        if(this.props.open)
        {
            this.viewModel.requestDocumentDetails(this.company.id,this.document);
        }
        
    }

    componentWillUnmount() { 
        this.viewModel.unsubscribeOnLoading(this.showLoading);
        this.viewModel.unsubscribeOnShowError(this.onError);
        this.viewModel.unsubscribeOnDocumentDetailData(this.showDocumentsDetails);
    }

    handleClickShowDocumentList() {
        
        this.setState({showListDocument:!this.state.showListDocument})
    }

    showDocumentsDetails(docDetails) {
        this.setState ({docDetail : docDetails});
    }
    
    showLoading(value) {
        this.setState ({loading : value});
    }

    onError(error) {
        console.error("ah que chimbo!");
        console.error(error);
    }

    render() {
       return (<>
        <MaterialUI.Dialog
            open={this.props.open}
            onClose={this.props.handleClose}
            scroll={"paper"}>
                
                <MaterialUI.DialogTitle >
                    {`Detalles del documento - ${this.state.docDetail?.id_documento_afv}`}
                </MaterialUI.DialogTitle>
                
                <MaterialUI.DialogContent dividers={true} sx={{ minWidth: 700 }}>
                    <MaterialUI.Typography variant="body2"><b>Vendedor:</b> {this.state.docDetail.detail?.VENDEDOR}</MaterialUI.Typography>
                    <MaterialUI.Box sx={{ p: 2 }}>
                        <MaterialUI.Stack direction="row" spacing={2}>
                                <MaterialUI.Typography variant="body2"><b>Monto:</b> {Number(this.state.docDetail.detail?.MONTO_ANEXO).toFixed(2)} {this.state.docDetail.detail?.MONEDA}</MaterialUI.Typography>
                                {!this.state.docDetail.detail?.MONTO_EDITADO?<></>:
                                    <MaterialUI.Typography variant="body2"><b>Monto editado:</b> {this.state.docDetail.detail?.MONTO_EDITADO}</MaterialUI.Typography>
                                }
                                <MaterialUI.Typography variant="body2"><b>Sobrepago:</b> {Number(this.state.docDetail.detail?.MONTO_ANEXO).toFixed(2)} {this.state.docDetail.detail?.MONEDA}</MaterialUI.Typography>
                        </MaterialUI.Stack>
                    </MaterialUI.Box>
                    <MaterialUI.Box sx={{ p: 2 }}>
                        <MaterialUI.Stack direction="row" spacing={2}>
                            <MaterialUI.Typography variant="body2"><b>Banco:</b> {}</MaterialUI.Typography>
                            <MaterialUI.Typography variant="body2"><b>Cuenta:</b> {}</MaterialUI.Typography>
                        </MaterialUI.Stack>
                        <MaterialUI.Stack direction="row" spacing={2}>
                            <MaterialUI.Typography variant="body2"><b>Forma de pago:</b> {}</MaterialUI.Typography>
                            <MaterialUI.Typography variant="body2"><b>Referencia:</b> {}</MaterialUI.Typography>
                        </MaterialUI.Stack>
                    </MaterialUI.Box>
                    
                    <MaterialUI.Divider sx={{ m: 1 }} orientation="horizontal"/>

                    <ClientFromDocDetail
                        clients={this.state.docDetail?.detail?.CLIENTES} />

                    <MaterialUI.Divider sx={{ m: 1 }} orientation="horizontal"/>
                    
                    <MaterialUI.Box >
                        <MaterialUI.Stack alignItems="center" direction="row" spacing={1}>
                            <MaterialUI.Typography variant="body2">
                                <b>Documentos Asociados</b>
                            </MaterialUI.Typography>

                            {this.state.docDetail?.detailList?.length > 0 &&
                                <MaterialUI.Chip
                                    variant="outlined"
                                    icon={this.state.showListDocument?<ArrowUpwardIcon/>:<ArrowDownwardIcon/>} 
                                    onClick={this.handleClickShowDocumentList} 
                                />
                            }
                        </MaterialUI.Stack>
                    </MaterialUI.Box>
                    
                    <AssociatedDocumentsAdapter
                        show_list={this.state.showListDocument}
                        doc_type={this.document?.tipo_documento} 
                        items={this.state.docDetail?.detailList}/>
                    
                </MaterialUI.DialogContent>
                <LoadingScreen loading={this.state.loading}/>
        </MaterialUI.Dialog>
        
      </>) 
    }
}