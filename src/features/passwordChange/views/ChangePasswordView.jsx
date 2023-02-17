import { Component } from "react";
import * as MaterialUI from "@mui/material";

import Strings from "../../../_Resources/strings/strings";
import CustomButtonForm from "../../../_commons/views/CustomButtonForm";
import PasswordInput from "../../../_commons/views/PasswordInput";
import TitleSection from "../../../_commons/views/TitleSection";


export default class ChangePasswordView extends Component {


    constructor(props) {
        super(props);
        this.state = {loading:false, currentPass:"", newPass:"",confirmPass:""};
        this.viewModel = props.viewModel;
        this.changePassSuccessful = this.changePassSuccessful.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.onError = this.onError.bind(this);
        this.handledCurrentPassChange = this.handledCurrentPassChange.bind(this);
        this.handledNewPassChange = this.handledNewPassChange.bind(this);
        this.handledConfirmPassChange = this.handledConfirmPassChange.bind(this);
        this.handledChangePassWordClick = this.handledChangePassWordClick.bind(this);
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
        this.viewModel.changePassword(this.state.currentPass, this.state.newPass, this.state.confirmPass);
    }

    showLoading(value) {

        if(this.props.onLoadingChangeListener) {
            this.props.onLoadingChangeListener(value);
        }
    }

    changePassSuccessful() {
        this.setState({loading:false, currentPass:"", newPass:"",confirmPass:""});
        if(this.props.onChangePassSuccessful) {
            this.props.onChangePassSuccessful();
        }
    }

    onError(error) {
        console.log("ah que chimbo!");
        console.error(error);
    }

    componentDidMount() {
        this.viewModel.subscribeOnLoading(this.showLoading);
        this.viewModel.subscribeOnShowError(this.onError);
        this.viewModel.subscribeOnChangePassSuccessful(this.changePassSuccessful);
    }

    componentWillUnmount() {
        this.viewModel.unsubscribeOnLoading(this.showLoading);
        this.viewModel.unsubscribeOnShowError(this.onError);
        this.viewModel.unsubscribeOnChangePassSuccessful(this.changePassSuccessful);
    }

    render() {
        return (
            <>
                <TitleSection text={Strings.change_pass_title} />
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
                                label={Strings.change_pass_current_pass} 
                                tooltipHideText={Strings.text_hide}
                                tooltipShowText={Strings.text_show}/>
                            
                            <PasswordInput
                                onChangeText={this.handledNewPassChange}
                                textValue={this.state.newPass} 
                                label={Strings.change_pass_new_pass} 
                                tooltipHideText={Strings.text_hide}
                                tooltipShowText={Strings.text_show}/>
                            
                            <PasswordInput
                                onChangeText={this.handledConfirmPassChange}
                                textValue={this.state.confirmPass} 
                                label={Strings.change_pass_confirm_pass} 
                                tooltipHideText={Strings.text_hide}
                                tooltipShowText={Strings.text_show}/>

                            <CustomButtonForm
                                text={Strings.text_save} />

                        </MaterialUI.Grid>
                    </MaterialUI.Box>
                </form>

                
            </>
        );
    }
}