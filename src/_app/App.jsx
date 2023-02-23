import './App.css';
import React, { useEffect, useState } from "react";
import Login from '../features/login/views/LoginView';
import LoginViewModel from "../features/login/viewModels/LoginViewModel"
import { BrowserRouter, Routes, Route,useLocation  } from "react-router-dom";
import { useContext } from "react";
import Home from '../features/home/views/HomeView';

import MainMenu from '../_Resources/menu/mainMenu';
import { SessionProvider,Context } from '../sessionManager/views/SessionContext';
import SessionViewModel from '../sessionManager/viewModels/SessionViewModel'
import ROUTES from '../_commons/Routes';
import LogoutView from '../features/logout/views/LogoutView';
import LogoutViewModel from '../features/logout/viewModels/LogoutViewModel';
import ButtonWebLogoutSideBar from '../features/logout/views/ButtonWebLogoutSideBar';
import ButtonMobileLogoutSideBar from '../features/logout/views/ButtonMobileLogoutSideBar';
import Strings from '../_Resources/strings/strings';
import SessionRepository from '../sessionManager/repository/SessionRepository';
import ForgotPasswordViewModel from '../features/passwordForgot/viewModels/ForgotPasswordViewModel';
import HomeViewModel from '../features/home/viewModels/HomeViewModel';
import ChangePasswordViewModel from '../features/passwordChange/viewModels/ChangePasswordViewModel';
import RootPath from '../features/_rootPath/views/RootPath';



function AppRoutesWrapper(props) {
  
  const [isHaveSession, setIsHaveSession] = useState(SessionRepository.isHaveSessionToken());
  const context = useContext(Context);
  
  const initialRoutes = MainMenu.filter(item => !item.isNeedPermission);
  const [privateRoutes,setPrivateRoutes]  = useState(initialRoutes);    
  const [sideBarOptions,setSideBarOptions] = useState(privateRoutes.filter(item => item.isSideBarItem));
  
  const onPermissionsLoaded = (permissions) => {
    
    if(permissions) {
      
        const permissionsIds = permissions.map(item => item.permission_id);
          
        const privateRoutes = MainMenu
          .filter(item => !item.isNeedPermission || ( item.permissions && item.permissions.some(p => permissionsIds.includes(p)) ) );
          
        const sideBarOptions = privateRoutes.filter( item => item.isSideBarItem);  
        
        setPrivateRoutes(privateRoutes);
        setSideBarOptions(sideBarOptions);
    }
  }

  useEffect(() => {
    context.requestPermissions(onPermissionsLoaded);
  }, [isHaveSession]);
  
  
  
  return (
    <Routes>
      

      <Route path={ROUTES.ROOT} 
          element={<RootPath sessionChecker = {context.checkUserSession}/>}/>
      
      
      <Route path={ROUTES.LOGIN} 
          element={<Login 
                      onSessionInit ={setIsHaveSession} 
                      sessionChecker = {context.checkUserSession}
                      viewModel={new LoginViewModel()} 
                      forgotPasswordViewModel = {new ForgotPasswordViewModel()}/>}/> 

      <Route path={ROUTES.BASE_APP_ROUTE} 
          element={<Home 
                      sessionChecker = {context.checkUserSession}
                      viewModel = {new HomeViewModel()}
                      changePassViewModel = {new ChangePasswordViewModel()}
                      logoutWebButton = {{component:ButtonWebLogoutSideBar, props:{ title:Strings.side_bar_logout}}}
                      logoutMobileButton = {{component:ButtonMobileLogoutSideBar, props:{ title:Strings.side_bar_logout}}}
                      logoutElement = {{component:LogoutView, props:{ onSessionClose:setIsHaveSession, viewModel:new LogoutViewModel()}}} 
                      menuItems = {sideBarOptions}/>} >
            
            {
              privateRoutes.map( (item,index) => { 
                  const r = <Route key={index} path={item.path} element={item.page} />;
                  return (r); 
              })
            }
            
      </Route>

    </Routes>
  );
}


export default function App(props) {
  
  const location = window.location;
  return (
   
    <BrowserRouter>
      <SessionProvider currentPath={location.pathname} viewModel={new SessionViewModel()}>
        <AppRoutesWrapper />        
      </SessionProvider>
    </BrowserRouter>
  );
}

