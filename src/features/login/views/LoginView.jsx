import React from "react";
import { Component } from "react";
import { Navigate } from "react-router-dom"
import Strings from "../../../__Resources/strings";

export default class Login extends Component 
{
    
    constructor(props) {
        super(props);
        this.viewModel = props.viewModel
        this.state = {email:"", pass:"", loading:false, toHome:false};
        
        this.handledButtonClick = this.handledButtonClick.bind(this);
        this.handledEmailInput = this.handledEmailInput.bind(this);
        this.handledPasswordInput = this.handledPasswordInput.bind(this);
        this.onShowLoading = this.onShowLoading.bind(this);
        this.onLoginSuccessful = this.onLoginSuccessful.bind(this);
        this.onError = this.onError.bind(this);
    }
    
    componentDidMount(){
        this.viewModel.subscribeOnLoginSuccessful(this.onLoginSuccessful);
        this.viewModel.subscribeOnLoading(this.onShowLoading);
        this.viewModel.subscribeOnShowError(this.onError);
    }

    componentWillUnmount() {
        this.viewModel.unsubscribeOnLoginSuccessful(this.loginSuccessfulWrapper);
        this.viewModel.unsubscribeOnLoading(this.loadingWrapper);
        this.viewModel.unsubscribeOnShowError(this.onError);
    }

    onShowLoading(value) {
        this.setState ({loading : value});
    }

    onLoginSuccessful(){
        //redirect
        this.setState({toHome:true})
    }

    onError() {
        console.log("ah que chimbo!")
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
            {this.state.toHome && <Navigate to="/home"/>}
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
            {this.state.loading? <p> {Strings.loading} </p> : null}
        </div>
        );
    }
}