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
        this.state = {loading:false,showOperationSuccessful:false};
        this.userViewModel = props.userViewModel;
        this.changePassViewModel = props.changePassViewModel;
        this.onLoadingChangeHandled = this.onLoadingChangeHandled.bind(this);
        this.onRequestCompletedSuccessful = this.onRequestCompletedSuccessful.bind(this);
        this.closeOperationSuccessfulDialog = this.closeOperationSuccessfulDialog.bind(this);
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
                                onLoadingChangeListener={this.onLoadingChangeHandled}
                                onChangePassSuccessful={this.onRequestCompletedSuccessful}
                                viewModel={this.changePassViewModel}/>
                        
                            <CustomMessageDialog 
                                open={this.state.showOperationSuccessful}
                                onClose={this.closeOperationSuccessfulDialog}/>
                            
                        </MaterialUI.Stack>
                    </MaterialUI.Grid>
            </FeatureContainer>        
        </>);
    }
}