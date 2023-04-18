import { Component, Fragment } from "react";

import * as MaterialUI from "@mui/material";
import DataTable from 'react-data-table-component';
import Dropdown from "../../../_commons/views/Dropdown";
import DocumentDetailView from "../../documentDetails/views/DocumentDetailView";
import LoadingScreen from "../../../_commons/views/LoadingScreen";
import Strings from "../../../_Resources/strings/strings";
import Constants from "../../../_commons/Constants";
import DropdownFilter from "../../../_commons/views/DropdownFilter";
import FeatureContainer from "../../../_commons/views/FeatureContainer";

export default class DocumentMissingListView extends Component 
{  

    constructor(props) {
        super(props);
        this.state = {
            loading_options:false,
            loading_documents:false,
        };
        this.viewModel = props.viewModel;
        this.showLoadingDocuments = this.showLoadingDocuments.bind(this);
        this.showLoadingOptionsDocuments = this.showLoadingOptionsDocuments.bind(this);
    }

    showLoadingOptionsDocuments(value) {
        this.setState ({loading_options : value});
    }

    showLoadingDocuments(value) {
        this.setState ({loading_documents : value});
    }

    componentDidMount() {
        
        this.viewModel.subscribeOnLoadingDocuments(this.showLoadingDocuments);
        this.viewModel.subscribeOnLoadingDocumentsOptions(this.showLoadingOptionsDocuments);
    }

    componentWillUnmount() {
        this.viewModel.unsubscribeOnLoadingDocuments(this.showLoadingDocuments);
        this.viewModel.unsubscribeOnLoadingDocumentsOptions(this.showLoadingOptionsDocuments);
    }

    render(){
        
        return (
            <>
             <FeatureContainer
                title_text={'Documentos Faltantes en XRT'}
                loading={this.state.loading_options}>
                

             </FeatureContainer>
            </>
        );
    }
}