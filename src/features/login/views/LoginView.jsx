import React from "react";
import { Component } from "react";
import { Navigate } from "react-router-dom"
import ROUTES from "../../../_commons/Routes";
import Strings from "../../../_Resources/strings/strings";

export default class Login extends Component 
{
    
    constructor(props) {
        super(props);
        this.viewModel = props.viewModel
        this.state = {email:"", pass:"", loading:false, toHome:false};
        
        this.handledButtonClick = this.handledButtonClick.bind(this);
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
        this.setState ({loading : value});
    }

    onLoginSuccessful(){
        //redirect
        this.setState({toHome:true})
    }

    onError(error) {
        console.log("ah que chimbo!");
        console.error(error);
    }

    handledEmailInput(event) {
        this.setState ({email : event.currentTarget.value});
    }

    handledPasswordInput(event) {
        this.setState ({pass : event.currentTarget.value});
    }
    
    handledButtonClick() {        
        const email = this.state.email;
        const pass = this.state.pass;
        this.viewModel.loginWithMail(email,pass);
    }

    render()
    {
        return (
        <div>
            {this.state.toHome && <Navigate to={ROUTES.FIRST_PAGE_APP}/>}
            <label >
                {Strings.login_user_name_label}
                <br/>
                <input value ={this.state.email} type="text" onChange={this.handledEmailInput}/>
            </label> 
            <br/>
            <label>
                {Strings.login_user_password_label}
                <br/>
                <input type="password" onChange={this.handledPasswordInput}/>
            </label>
            <br/>
            <button onClick={this.handledButtonClick}>{Strings.login_button}</button>
            {this.state.loading? <p> {Strings.loading} </p> : <></>}
        </div>
        );
    }
}