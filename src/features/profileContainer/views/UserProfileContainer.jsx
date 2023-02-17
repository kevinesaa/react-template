import { Component } from "react";
import * as MaterialUI from "@mui/material";
import Strings from "../../../_Resources/strings/strings";
import ChangePasswordView from "../../passwordChange/views/ChangePasswordView";
import UserProfile from "../../profile/views/UserProfile";
import FeatureContainer from "../../../_commons/views/FeatureContainer";
import LoadingScreen from "../../../_commons/views/LoadingScreen";

export default class UserProfileContainer extends Component 
{
    constructor(props) {
        super(props);
        this.state = {loading:false};
        this.userViewModel = props.userViewModel;
        this.changePassViewModel = props.changePassViewModel;
        this.onLoadingChangeHandled = this.onLoadingChangeHandled.bind(this);
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
                                viewModel={this.userViewModel}/>
                            
                            <ChangePasswordView  
                                onLoadingChangeListener={this.onLoadingChangeHandled}
                                viewModel={this.changePassViewModel}/>
                        
                        </MaterialUI.Stack>
                    </MaterialUI.Grid>
            </FeatureContainer>
            
            <LoadingScreen loading={this.state.loading}/>
        </>);
    }
}