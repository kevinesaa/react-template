import { Component } from "react";
import * as MaterialUI from "@mui/material";
import LoadingScreen from "../../../_commons/views/LoadingScreen";
import Strings from "../../../_Resources/strings/strings";
import ChangePasswordView from "../../changePassword/views/ChangePasswordView";
import UserProfile from "../../profile/views/UserProfile";

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
            
            <MaterialUI.Paper
                elevation={2}
                sx={{
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: "5px",
                    pb: 5,
                }}>
                
                <MaterialUI.Grid item sx={{ pt: 2, pl: 2 }}>
                    <MaterialUI.Typography variant="subtitles">Mi Perfil</MaterialUI.Typography>
                </MaterialUI.Grid>
                <MaterialUI.Divider variant="middle"/>

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
            </MaterialUI.Paper>

            <LoadingScreen loading={this.state.loading}/>
        </>);
    }
}