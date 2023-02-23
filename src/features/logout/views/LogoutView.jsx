import React from "react";
import * as MaterialUI from "@mui/material";
import Strings from "../../../_Resources/strings/strings";
import LoadingScreen from "../../../_commons/views/LoadingScreen";
import ROUTES from "../../../_commons/Routes";

export default class LogoutView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {loading:false};
        this.viewModel = props.viewModel;
        this.handledOnPositiveOption = this.handledOnPositiveOption.bind(this);
        this.handledOnNegativeOption = this.handledOnNegativeOption.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.onError = this.onError.bind(this);
        this.logoutCompleted = this.logoutCompleted.bind(this);
    }
    
    componentDidMount() {
        this.viewModel.subscribeOnLoading(this.showLoading);
        this.viewModel.subscribeOnShowError(this.onError);
        this.viewModel.subscribeOnLogoutCompleted(this.logoutCompleted);
    }

    componentWillUnmount() {
        this.viewModel.unsubscribeOnLoading(this.showLoading);
        this.viewModel.unsubscribeOnShowError(this.onError);
        this.viewModel.unsubscribeOnLogoutCompleted(this.logoutCompleted);
    }

    showLoading(value) {
        this.setState({ loading: value });
    }

    logoutCompleted() {
        
        if(this.props.onSessionClose) {
            this.props.onSessionClose(false);
            window.location.replace(ROUTES.LOGIN);
        }
    }

    handledOnPositiveOption() {
        this.viewModel.logoutSession();
    }

    handledOnNegativeOption() {
        if(this.props.onNegativeOptionListener){
            this.props.onNegativeOptionListener();
        }
    }

    onError(error) {
        console.log("ah que chimbo!");
        console.error(error);
    }

    render() {
        return (<>

            <MaterialUI.Dialog
                open={this.props.open} >
                
                <MaterialUI.DialogTitle >
                    {Strings.logout_view_title}
                </MaterialUI.DialogTitle>
                
                <MaterialUI.DialogContent dividers={true} sx={{ minWidth: 300 }}>
                    
                    <MaterialUI.Typography variant="body1">
                        <b>{Strings.logout_view_message}</b>
                    </MaterialUI.Typography>
                    <MaterialUI.Box >
                        <MaterialUI.Stack alignItems="center" direction="row" spacing={1}>
                            <MaterialUI.Button
                                onClick={this.handledOnPositiveOption}
                                fullWidth
                                variant="contained"
                                sx={{
                                    px: 5,
                                    mt: 1,
                                    mb: 1,
                                    borderRadius: "1rem",
                                    color: "white.main",
                                    textTransform: "none",
                                }}>
                                {Strings.text_yes}
                            </MaterialUI.Button>

                            <MaterialUI.Button
                                onClick={this.handledOnNegativeOption}
                                fullWidth
                                variant="contained"
                                sx={{
                                    px: 5,
                                    mt: 1,
                                    mb: 1,
                                    borderRadius: "1rem",
                                    color: "white.main",
                                    textTransform: "none",
                                }}>
                                {Strings.text_no}
                            </MaterialUI.Button>

                        </MaterialUI.Stack>
                    </MaterialUI.Box >
                </MaterialUI.DialogContent>
                
                <LoadingScreen loading={this.state.loading}/>

            </MaterialUI.Dialog>
        </>); 
    }
}