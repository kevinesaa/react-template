import { Component } from "react";
import * as MaterialUI from "@mui/material";

import CustomButtonForm from "../../../_commons/views/CustomButtonForm";
import CustomTextField from "../../../_commons/views/CustomTextField";
import Strings from "../../../_Resources/strings/strings";
import LoadingScreen from "../../../_commons/views/LoadingScreen";


export default class ForgotPasswordView extends Component {

    constructor(props) {
        super(props);
        this.state = {loading:false,request_successful:false,email:"" };
        this.handledSubmit = this.handledSubmit.bind(this);
        this.handledOnCloseDialog = this.handledOnCloseDialog.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.handledEmailInput = this.handledEmailInput.bind(this);
        this.changePasswordRequestCompletedSuccessful = this.changePasswordRequestCompletedSuccessful.bind(this);
        this.viewModel = props.viewModel;
    }

    handledOnCloseDialog() {
        if(!this.state.loading && this.props.handleClose) {
            this.props.handleClose();
            this.setState({request_successful:false, email:"" });
        }
    }

    handledEmailInput(email) {
        this.setState({email});
    }

    handledSubmit(event) {
        event.preventDefault();
        this.viewModel.requestChangePassword(this.state.email);
    }

    showLoading(value) {
        this.setState({ loading: value });
    }

    changePasswordRequestCompletedSuccessful() {
        this.setState({request_successful:true});
    }

    onError(error) {
        console.log("ah que chimbo!");
        console.error(error);
    }

    componentDidMount() {
        this.viewModel.subscribeOnLoading(this.showLoading);
        this.viewModel.subscribeOnShowError(this.onError);
        this.viewModel.subscribeOnRequestChangePassSuccessful(this.changePasswordRequestCompletedSuccessful);
    }

    componentWillUnmount() {
        this.viewModel.unsubscribeOnLoading(this.showLoading);
        this.viewModel.unsubscribeOnShowError(this.onError);
        this.viewModel.unsubscribeOnRequestChangePassSuccessful(this.changePasswordRequestCompletedSuccessful);
    }

    render() {

        return (<>
            <MaterialUI.Dialog
                open={this.props.open}>

                <MaterialUI.DialogTitle >
                    <MaterialUI.Stack 
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center">
                    
                        <MaterialUI.Typography variant="h6" >
                            {Strings.forgot_pass_view_title}
                        </MaterialUI.Typography>
                    
                        {!this.state.loading &&
                            
                            <MaterialUI.Button size="small" color="error" onClick={this.handledOnCloseDialog}>X</MaterialUI.Button>
                        }
                    </MaterialUI.Stack>
                
                </MaterialUI.DialogTitle>
                
                <MaterialUI.DialogContent dividers={true} sx={{ width: 400 }}>
                    {!this.state.request_successful &&

                        <form onSubmit={this.handledSubmit}>
                            <MaterialUI.Box
                                sx={{ flexGrow: 1, m: 2 }}
                                noValidate
                                autoComplete="off">

                                <CustomTextField
                                    required={true}
                                    onChangeText={this.handledEmailInput}
                                    type="email"
                                    textValue={this.state.email}
                                    label={Strings.login_user_name_label} />
                                <br />
                                
                                <CustomButtonForm
                                    text={Strings.text_send} />
                            </MaterialUI.Box>
                        </form>
                    }

                    {this.state.request_successful && 
                        <>
                            <MaterialUI.Typography variant="body1" >
                                {Strings.forgot_pass_view_successful_message}
                            </MaterialUI.Typography>
                        </>
                    }
                </MaterialUI.DialogContent>
                
                <LoadingScreen loading={this.state.loading}/>

            </MaterialUI.Dialog>
        </>);
    }
}