import React from "react";
import ROUTES from "../../_commons/Routes";

const Context = React.createContext({});

class SessionProvider extends React.Component {
    
    constructor(props){
        super(props);
        
        this.state = {currentPath:props.currentPath};
        this.viewModel = props.viewModel;
        this.checkUserSession = this.checkUserSession.bind(this);
        this.routerHelper = this.routerHelper.bind(this);
        this.goToHome = this.goToHome.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
        this.requestPermissions = this.requestPermissions.bind(this);
    }

    routerHelper(goTo,pathToCompare) {
        
        const currentPath = this.state.currentPath;
        if(!currentPath.startsWith(pathToCompare)) {
            
            window.location.replace(goTo);
        }
    }

    goToHome() {

        this.routerHelper(ROUTES.FIRST_PAGE_APP,ROUTES.BASE_APP_ROUTE);
    }

    goToLogin() {
        
        this.routerHelper(ROUTES.LOGIN,ROUTES.LOGIN);
    }
    
    componentDidMount() {
        this.viewModel.subscribeOnShowHome(this.goToHome);
        this.viewModel.subscribeOnShowLogin(this.goToLogin);
    }
    
    componentWillUnmount() {
        this.viewModel.unsubscribeOnShowHome(this.goToHome);
        this.viewModel.unsubscribeOnShowLogin(this.goToLogin);
    }
    
    checkUserSession() {
        this.viewModel.checkUserSession();
    }

    requestPermissions(callback) {
       
        this.viewModel.requestPermissions(callback);
    }
    
    render() {
        
        return (
            <>
                <Context.Provider value={
                    { 
                        checkUserSession:this.checkUserSession,
                        requestPermissions:this.requestPermissions
                }}>
                    
                    {this.props.children}
                </Context.Provider>
            </>
        );
    }
}

export {
    SessionProvider,
    Context
}