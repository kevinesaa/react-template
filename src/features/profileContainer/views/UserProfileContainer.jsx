import { Component } from "react";
import * as MaterialUI from "@mui/material";
import Strings from "../../../_Resources/strings/strings";
import ChangePasswordView from "../../passwordChange/views/ChangePasswordView";
import UserProfile from "../../profile/views/UserProfile";
import FeatureContainer from "../../../_commons/views/FeatureContainer";
import CustomMessageDialog from "../../../_commons/views/CustomMessageDialog";

export default class UserProfileContainer extends Component 
{
    constructor(props) {
        super(props);
        this.state = {loading:false,showOperationSuccessful:false, showErrorDialog:false,errorMessage:""};
        this.userViewModel = props.userViewModel;
        this.changePassViewModel = props.changePassViewModel;
        this.onLoadingChangeHandled = this.onLoadingChangeHandled.bind(this);
        this.onRequestCompletedSuccessful = this.onRequestCompletedSuccessful.bind(this);
        this.closeOperationSuccessfulDialog = this.closeOperationSuccessfulDialog.bind(this);
        this.onError = this.onError.bind(this);
        this.closeErrorDialog = this.closeErrorDialog.bind(this);
    }
    
    onRequestCompletedSuccessful() {
        this.setState({showOperationSuccessful:true});
    }

    closeOperationSuccessfulDialog() {
        this.setState({showOperationSuccessful:false});
    }

    onLoadingChangeHandled(value) {
        this.setState( {loading:value})
    }

    closeErrorDialog() {
        this.setState({showErrorDialog:false,errorMessage:""});
    }

    onError(error) {
        let errorMessage = Strings.text_operation_general_error;
        if(error?.sourceErrorCode == -9) {
            errorMessage = Strings.change_pass_error_not_valid_current_pass;
        }
        
        this.setState({showErrorDialog:true, errorMessage:errorMessage});
    }

    render() 
    {
        return (<>
            <FeatureContainer 
                title_text={Strings.user_profile_container_title}
                loading={this.state.loading}>
                
                <MaterialUI.Grid item xs={12} sm={12} md={10} lg={10} sx={{ mt: 2 }}>
                        <MaterialUI.Stack sx={{ mx: 2 }}>

                            <UserProfile
                                onLoadingChangeListener={this.onLoadingChangeHandled}
                                onUpdateProfileSuccessful={this.onRequestCompletedSuccessful}
                                viewModel={this.userViewModel}/>
                            
                            <ChangePasswordView 
                                onNotifyError={this.onError} 
                                onLoadingChangeListener={this.onLoadingChangeHandled}
                                onChangePassSuccessful={this.onRequestCompletedSuccessful}
                                viewModel={this.changePassViewModel}/>
                        
                            <CustomMessageDialog 
                                open={this.state.showOperationSuccessful}
                                message={Strings.text_operation_successful}
                                onClose={this.closeOperationSuccessfulDialog}/>
                            
                            <CustomMessageDialog 
                                open={this.state.showErrorDialog}
                                message={this.state.errorMessage}
                                onClose={this.closeErrorDialog}/>
                            
                        </MaterialUI.Stack>
                    </MaterialUI.Grid>
            </FeatureContainer>        
        </>);
    }
}