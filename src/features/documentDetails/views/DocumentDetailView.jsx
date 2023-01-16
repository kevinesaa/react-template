import React from "react";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import * as MaterialUI from "@mui/material";
import LoadingScreen from "../../../_commons/views/LoadingScreen";
import ClientFromDocDetail from "./clientsSection/ClientFromDocDetail";
import AssociatedDocumentsAdapter from "./associatedDocumentsSecction/AssociatedDocumentsAdapter";
import Constants from "../../../_commons/Constants";
import AmountSectionAdapter from "./amountSection/AmountSectionAdapter";

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
            this.viewModel.requestDocumentDetails(this.company.id,this.document.id_documento);
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
                    {Constants.DOC_TYPE_ANEXO_ID == this.state.docDetail?.tipo_documento? 'Anexo':'Recibo'}
                    {` - ${this.state.docDetail?.id_documento_afv}`}
                </MaterialUI.DialogTitle>
                
                <MaterialUI.DialogContent dividers={true} sx={{ minWidth: 700 }}>
                    
                    <MaterialUI.Stack direction="row" spacing={2}>
                        <MaterialUI.Typography variant="body2"><b>ID:</b> {this.state.docDetail?.id_documento}</MaterialUI.Typography>
                        <MaterialUI.Typography variant="body2"><b>Creador por:</b> {this.state.docDetail?.usuario_creacion}</MaterialUI.Typography>
                        <MaterialUI.Typography variant="body2"><b>Ruta:</b> {this.state.docDetail?.id_zona}</MaterialUI.Typography>
                    </MaterialUI.Stack>
                    <MaterialUI.Stack direction="row" spacing={2}>
                        <MaterialUI.Typography variant="body2"><b>Conciliado:</b> {this.state.docDetail?.estatus > 3?'Sí':'No'}</MaterialUI.Typography>
                        {
                            this.state.docDetail?.estatus > 3 && <MaterialUI.Typography variant="body2"><b>Fecha: </b> {this.state.docDetail?.update_at?.substring(0,10)}</MaterialUI.Typography>
                        }
                        
                    </MaterialUI.Stack>   
                        <MaterialUI.Box sx={{ p: 1 }}>
                        <MaterialUI.Typography variant="body2"><b>Vendedor:</b> {this.state.docDetail.detail?.VENDEDOR}</MaterialUI.Typography>
                    </MaterialUI.Box> 
                    
                    <MaterialUI.Box sx={{ p: 1 }}>
                        <AmountSectionAdapter 
                            document={this.state.docDetail}/>    
                    </MaterialUI.Box>
                    <MaterialUI.Box sx={{ p: 1 }}>
                    <MaterialUI.Typography variant="body2"><b>Fecha Documento:</b> {this.state.docDetail?.detail?.FECHA_DOCUMENTO?.substring(0,10)} </MaterialUI.Typography>
                        <MaterialUI.Stack direction="row" spacing={2}>
                            <MaterialUI.Typography variant="body2"><b>Banco:</b> {this.state.docDetail?.detail?.BANCO}</MaterialUI.Typography>
                            <MaterialUI.Typography variant="body2"><b>Cuenta:</b> {this.state.docDetail?.detail?.NUMERO_CUENTA_BANCARIA}</MaterialUI.Typography>
                        </MaterialUI.Stack>
                        <MaterialUI.Stack direction="row" spacing={2}>
                            <MaterialUI.Typography variant="body2"><b>Forma de pago:</b> {this.state.docDetail?.tipo_documento == Constants.DOC_TYPE_ANEXO_ID ? 'Deposito': this.state.docDetail?.detail?.FORMA_PAGO}</MaterialUI.Typography>
                            <MaterialUI.Typography variant="body2"><b>Referencia:</b> {this.state.docDetail?.detail?.REFERENCIA}</MaterialUI.Typography>
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

                            {this.state.docDetail?.detail?.DOCUMENTOS_ASOCIADOS?.length > 0 &&
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
                        currency={this.state.docDetail?.detail?.MONEDA} 
                        currency_id={this.state.docDetail?.detail?.ID_MONEDA} 
                        items={this.state.docDetail?.detail?.DOCUMENTOS_ASOCIADOS}/>
                    
                </MaterialUI.DialogContent>
                <LoadingScreen loading={this.state.loading}/>
        </MaterialUI.Dialog>
        
      </>) 
    }
}