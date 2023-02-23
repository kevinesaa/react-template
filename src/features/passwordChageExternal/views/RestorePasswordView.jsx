import { Component } from "react";
import * as MaterialUI from "@mui/material";

import Strings from "../../../_Resources/strings/strings";
import CustomButtonForm from "../../../_commons/views/CustomButtonForm";
import PasswordInput from "../../../_commons/views/PasswordInput";
import TitleSection from "../../../_commons/views/TitleSection";
import ROUTES from "../../../_commons/Routes";


export default class RestorePasswordView extends Component {

    constructor(props) {
        super(props);
        this.state = {loading:false, token:"", newPass:"",confirmPass:""};
        this.viewModel = props.viewModel;
        this.onSessionStatus = this.onSessionStatus.bind(this);
        this.handledNewPassChange = this.handledNewPassChange.bind(this);
        this.handledConfirmPassChange = this.handledConfirmPassChange.bind(this);
        this.handledChangePasswordClick = this.handledChangePasswordClick.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.changePassSuccessful = this.changePassSuccessful.bind(this);
        this.onError = this.onError.bind(this);
    }
    
    onSessionStatus(hasSession) {
        
        if(hasSession) {
            window.location.replace(ROUTES.FIRST_PAGE_APP);
        }
        else {
            window.location.replace(ROUTES.LOGIN);
        }
    }

    handledNewPassChange(value) {
        this.setState({newPass:value});
    }

    handledConfirmPassChange(value) {
        this.setState({confirmPass:value});
    }
    
    handledChangePasswordClick(event) {
        event.preventDefault();
        this.viewModel.changePassword(this.state.token, this.state.newPass, this.state.confirmPass);
    }

    showLoading(value) {
        this.setState({loading:value});
    }

    changePassSuccessful() {
        this.setState({loading:false, token:"", newPass:"",confirmPass:""});
        window.location.replace(ROUTES.LOGIN);
    }

    onError(error) {
        console.log("ah que chimbo!");
        console.error(error);
    }

    componentDidMount() {
        this.viewModel.subscribeOnSessionStatus(this.onSessionStatus);
        const urlParams = new URLSearchParams(window.location.search);
        const myTokenParam = urlParams.get('token');
        
        if(myTokenParam == null) {
            this.viewModel.checkSession();
            return;
        }

        this.setState({token: myTokenParam});
        this.viewModel.subscribeOnLoading(this.showLoading);
        this.viewModel.subscribeOnShowError(this.onError);
        this.viewModel.subscribeOnChangePassSuccessful(this.changePassSuccessful);
    }

    componentWillUnmount() {
        this.viewModel.unsubscribeOnSessionStatus(this.onSessionStatus);
        this.viewModel.unsubscribeOnLoading(this.showLoading);
        this.viewModel.unsubscribeOnShowError(this.onError);
        this.viewModel.unsubscribeOnChangePassSuccessful(this.changePassSuccessful);
    }

    render() {

        return (<>
            recuperar contraseña
        </>);
    }
}