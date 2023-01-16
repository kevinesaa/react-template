import React from "react";
import { Navigate } from "react-router-dom"
import ROUTES from "../../_commons/Routes";

const Context = React.createContext({});

export class SessionProvider extends React.Component {
    
    constructor(props){
        super(props);
        
        this.state = {currentPath:props.currentPath};
        this.viewModel = props.viewModel;
        this.checkUserSession = this.checkUserSession.bind(this);
        this.routerHelper = this.routerHelper.bind(this);
        this.goToHome = this.goToHome.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
        this.myNavigate = this.myNavigate.bind(this);

    }

    routerHelper(goTo,pathToCompare) {
        
        const currentPath = this.state.currentPath;
        if(!currentPath.startsWith(pathToCompare)) {
            this.nav = true;
            this.setState({currentPath:goTo});
        }
    }

    goToHome() {

        this.routerHelper(ROUTES.FIRST_PAGE_APP,ROUTES.BASE_APP_ROUTE);
    }

    goToLogin() {
        
        this.routerHelper(ROUTES.LOGIN,ROUTES.LOGIN);
    }
    
    myNavigate() {
        const path = this.state.currentPath;

        if(this.nav) {
            this.nav = false;
            return <Navigate to={path}/>
        }
        else {
            
            return <></>
        }
    }
    
    componentDidMount() {
        this.viewModel.subscribeOnShowHome(this.goToHome);
        this.viewModel.subscribeOnShowLogin(this.goToLogin);
        
        this.checkUserSession();
    }
    
    componentWillUnmount() {
        this.viewModel.unsubscribeOnShowHome(this.goToHome);
        this.viewModel.unsubscribeOnShowLogin(this.goToLogin);
    }
    
    checkUserSession() {

        this.viewModel.checkUserSession();
    }
    
    render() {
        
        
        return (
            <>
                
                {this.myNavigate()}
                <Context.Provider value={
                    { 
                        checkUserSession:this.checkUserSession,
                        
                }}>
                    
                    {this.props.children}
                </Context.Provider>
            </>
        );
    }
}