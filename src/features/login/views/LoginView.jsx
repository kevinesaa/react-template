import React from "react";
import * as MaterialUI from "@mui/material";
import { Component } from "react";
import { Navigate } from "react-router-dom"
import ROUTES from "../../../_commons/Routes";
import CustomButtonForm from "../../../_commons/views/CustomButtonForm";
import PasswordInput from "../../../_commons/views/PasswordInput";
import CustomTextField from "../../../_commons/views/CustomTextField";
import Strings from "../../../_Resources/strings/strings";
import LoadingScreen from "../../../_commons/views/LoadingScreen";

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.viewModel = props.viewModel
        this.state = { email: "", pass: "", loading: false, toHome: false };

        this.handledSubmit = this.handledSubmit.bind(this);
        this.handledEmailInput = this.handledEmailInput.bind(this);
        this.handledPasswordInput = this.handledPasswordInput.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.onLoginSuccessful = this.onLoginSuccessful.bind(this);
        this.onError = this.onError.bind(this);
    }

    componentDidMount() {
        this.viewModel.subscribeOnLoginSuccessful(this.onLoginSuccessful);
        this.viewModel.subscribeOnLoading(this.showLoading);
        this.viewModel.subscribeOnShowError(this.onError);
    }

    componentWillUnmount() {
        this.viewModel.unsubscribeOnLoginSuccessful(this.loginSuccessfulWrapper);
        this.viewModel.unsubscribeOnLoading(this.showLoading);
        this.viewModel.unsubscribeOnShowError(this.onError);
    }

    showLoading(value) {
        this.setState({ loading: value });
    }

    onLoginSuccessful() {
        //redirect
        this.setState({ toHome: true })
    }

    onError(error) {
        console.log("ah que chimbo!");
        console.error(error);
    }

    handledEmailInput(emailAddress) {
        this.setState({ email: emailAddress });
    }

    handledPasswordInput(password) {
        this.setState({ pass: password });
    }

    handledSubmit(event) {
        
        event.preventDefault();
        const email = this.state.email;
        const pass = this.state.pass;
        this.viewModel.loginWithMail(email, pass);
    }

    render() {
        return (<div>

            {this.state.toHome && <Navigate to={ROUTES.FIRST_PAGE_APP} />}

            <MaterialUI.Container component="main" maxWidth="md">
                <MaterialUI.Typography
                    align="center"
                    sx={{ color: "secondary.main", pt: 10 }}
                    variant="h4">
                    {Strings.login_title}
                </MaterialUI.Typography>
                <MaterialUI.Divider sx={{ backgroundColor: "primary.main", height: "2px" }} />

                <MaterialUI.Box
                    sx={{
                        pt: 5,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}>
                    
                    <MaterialUI.Paper
                        elevation={3}
                        sx={{
                            width: "100%",
                            overflow: "hidden",
                            borderRadius: "10px",
                        }}
                    >
                        <MaterialUI.Grid container component="main">
                            <MaterialUI.Grid
                                item
                                sm={5}
                                md={5}
                                sx={{
                                    display: { xs: "none", sm: "block" },
                                    
                                    backgroundRepeat: "no-repeat",
                                    backgroundColor: (t) =>
                                        t.palette.mode === "light"
                                            ? t.palette.grey[50]
                                            : t.palette.grey[900],
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            />
                            
                            <MaterialUI.Grid
                                elevation={6}>
                                    
                                <MaterialUI.Box
                                    sx={{   display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center"}}>
                                        
                                        <MaterialUI.Typography
                                            variant="h5"
                                            sx={{mt: 5}}>
                                            {Strings.login_subtitle}
                                        </MaterialUI.Typography>

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
                                                <PasswordInput
                                                    onChangeText={this.handledPasswordInput}
                                                    textValue={this.state.newPass}
                                                    label={Strings.login_user_password_label}
                                                    tooltipHideText={Strings.text_hide}
                                                    tooltipShowText={Strings.text_show} />

                                                <CustomButtonForm
                                                    text={Strings.login_button} />
                                            </MaterialUI.Box>
                                        </form>
                                </MaterialUI.Box>
                            </MaterialUI.Grid>
                        </MaterialUI.Grid>
                    </MaterialUI.Paper>
                </MaterialUI.Box>
          
            </MaterialUI.Container >
            <LoadingScreen loading={this.state.loading} />
        </div >       
        );
    }
}