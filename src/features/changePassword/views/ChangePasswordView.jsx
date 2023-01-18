

import { Component } from "react";
import * as MaterialUI from "@mui/material";
import LoadingScreen from "../../../_commons/views/LoadingScreen";
import Strings from "../../../_Resources/strings/strings";

import CustomButtonForm from "../../../_commons/views/CustomButtonForm";
import PasswordInput from "../../../_commons/views/PasswordInput";
import TitleSection from "../../../_commons/views/TitleSection";

export default class ChangePasswordView extends Component {


    constructor(props) {
        super(props);
        this.state = {loading:false, currentPass:"", newPass:"",confirmPass:""};
        this.viewModel = props.viewModel;
        this.showLoading = this.showLoading.bind(this);
        this.onError = this.onError.bind(this);
        this.handledCurrentPassChange = this.handledCurrentPassChange.bind(this);
        this.handledNewPassChange = this.handledNewPassChange.bind(this);
        this.handledConfirmPassChange = this.handledConfirmPassChange.bind(this);
    }


    handledCurrentPassChange(value) {
        this.setState({currentPass:value});
    }

    handledNewPassChange(value) {
        this.setState({newPass:value});
    }

    handledConfirmPassChange(value) {
        this.setState({confirmPass:value});
    }
    
    handledChangePassWordClick(event) {
        event.preventDefault();
    }

    showLoading(value) {

        if(this.props.onLoadingChangeListener) {
            this.props.onLoadingChangeListener(value);
        }
    }

    changePassSuccessful() {

    }

    onError(error) {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <>
                <TitleSection text={"Cambiar mi contraseña"} />
                <MaterialUI.Divider />
                <form onSubmit={this.handledChangePassWordClick}>
                    <MaterialUI.Box sx={{ flexGrow: 1, m: 2 }}
                        noValidate
                        autoComplete="off"
                    >
                        <MaterialUI.Grid container
                            spacing={{ xs: 1, md: 1 }}
                        >
                            <PasswordInput
                                onChangeText={this.handledCurrentPassChange}
                                textValue={this.state.currentPass} 
                                label={"Contraseña Actual"} 
                                tooltipHideText={"Ocultar"}
                                tooltipShowText={"Mostrar"}/>
                            
                            <PasswordInput
                                onChangeText={this.handledNewPassChange}
                                textValue={this.state.newPass} 
                                label={"Nueva Contraseña"} 
                                tooltipHideText={"Ocultar"}
                                tooltipShowText={"Mostrar"}/>
                            
                            <PasswordInput
                                onChangeText={this.handledNewPassChange}
                                textValue={this.state.newPass} 
                                label={"Confirmar Contraseña"} 
                                tooltipHideText={"Ocultar"}
                                tooltipShowText={"Mostrar"}/>

                            <CustomButtonForm
                                text={"Guardar"} />

                        </MaterialUI.Grid>
                    </MaterialUI.Box>
                </form>
            </>
        );
    }
}