import { Component } from "react";
import * as MaterialUI from "@mui/material";
import TitleSection from "../../../_commons/views/TitleSection";
import CustomTextField from "../../../_commons/views/CustomTextField";
import CustomButtonForm from "../../../_commons/views/CustomButtonForm";


export default class UserProfile extends Component 
{
    constructor(props) {
        super(props);
        this.state = {loading:false, email:"", user_name:"", user_last_name:""};
        this.viewModel = props.viewModel;
        this.showUserData = this.showUserData.bind(this);
        this.showLoading = this.showLoading.bind(this);
        this.onError = this.onError.bind(this);
        this.handledChangeUserProfileClick = this.handledChangeUserProfileClick.bind(this);
        this.handledEmailChangeText = this.handledEmailChangeText.bind(this);
        this.handledUserNameChangeText = this.handledUserNameChangeText.bind(this);
        this.handledUserLastNameChangeText = this.handledUserLastNameChangeText.bind(this);
    }

    handledChangeUserProfileClick(event) {
        event.preventDefault();
        
    }

    handledEmailChangeText(value) {
        this.setState ({email : value});
    }

    handledUserNameChangeText(value) {
        this.setState ({user_name : value});
    }

    handledUserLastNameChangeText(value) {
        this.setState ({user_last_name : value});
    }

    showUserData(userData) {
       
        this.setState ({
            email : userData.email,
            user_name:userData.userName,
            user_last_name:userData.userLastName?userData.userLastName:""
        });
    }

    showLoading(value) {
        
        if(this.props.onLoadingChangeListener)
        {
            this.props.onLoadingChangeListener(value);
        }
    }

    onError(error) {

    }

    componentDidMount() {
        
        this.viewModel.subscribeOnUserInfoCompleted(this.showUserData);
        this.viewModel.subscribeOnLoading(this.showLoading);
        this.viewModel.subscribeOnShowError(this.onError);

        this.viewModel.requestUserInfo();
    }

    componentWillUnmount() {

        this.viewModel.unsubscribeOnUserInfoCompleted(this.showUserData);
        this.viewModel.unsubscribeOnLoading(this.showLoading);
        this.viewModel.unsubscribeOnShowError(this.onError);
    }

    render() {
        return (<>
            <TitleSection text={"Mi información"} />
            <MaterialUI.Divider />
            
            <form onSubmit={this.handledChangeUserProfileClick}>
                <MaterialUI.Box
                    sx={{ flexGrow: 1, m: 2 }}
                    noValidate
                    autoComplete="off">
                    
                    <MaterialUI.Grid
                      container
                      spacing={{ xs: 1, md: 1 }}>

                        <CustomTextField
                            required = {true} 
                            onChangeText ={this.handledEmailChangeText}
                            type="email"
                            textValue={this.state.email}
                            label={"Correo electronico"}/>
                        
                        <CustomTextField
                            required = {true} 
                            onChangeText ={this.handledUserNameChangeText}
                            type="text"
                            textValue={this.state.user_name}
                            label={"Nombre"}/>

                        <CustomTextField
                            required = {true} 
                            onChangeText={this.handledUserLastNameChangeText}
                            type="text"
                            textValue={this.state.user_last_name}
                            label={"Apellido"}/>

                        <CustomButtonForm
                            text={"Guardar"} />

                    </MaterialUI.Grid> 
                </MaterialUI.Box>
            </form>
        </>);
    }
}
