import React, { useState,useEffect } from 'react';

import * as MaterialUI from "@mui/material";
import {  Outlet  } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from "./sidebar/SideBar";
import logo from "../../../_Resources/images/logo.png"

import ChangePasswordView from "../../passwordChange/views/ChangePasswordView";
import LoadingScreen from '../../../_commons/views/LoadingScreen';
import Strings from '../../../_Resources/strings/strings';

export default function Home(props)
{
    const [firstPasswordLoading,setFirstPasswordLoading] = useState(false);
    const [showFirstPass,setShowFirstPass] = useState(false);
    const [changeFirstPassSuccessful,setChangeFirstPassSuccessful] = useState(false);
    const [drawerWidth,setDrawerWidth ] = useState(240); 
    const [openLogout,setOpenLogout] = React.useState(false);
    const [openMenu,setOpenMenu] = React.useState(true);
    

    const handlendShowLogout = (item) => {
        setOpenLogout(!openLogout);
    }

    const handleDrawerToggleWeb = () => {
        setDrawerWidth(0);
        setOpenMenu(false);
    };

    const handledSideBarClick = () => {
        setDrawerWidth(240);
        setOpenMenu(true);
    }

    const showFirstTimeChangePassword = () => {
        console.log("aqui 3");
        setShowFirstPass(true);
        console.log("aqui 4");
    }

    const onChangePassSuccesful = () => {
        setChangeFirstPassSuccessful(true);
        setTimeout(() =>{
            setShowFirstPass(false);
            setChangeFirstPassSuccessful(false);
        }, 2000);
    }

    useEffect(() => {
        
        if(props.sessionChecker) {
            props.sessionChecker();
        }
        
        viewModel.subscribeOnShowFirstTimePass(showFirstTimeChangePassword);
        setTimeout(() =>{
            viewModel.checkFirstPasswordState();
        }, 1000);
        return () => {
            viewModel.unsubscribeOnShowFirstTimePass(showFirstTimeChangePassword);
        }
    },[]);

    const viewModel = props.viewModel;
    const changePassViewModel = props.changePassViewModel;
    const LogoutElement = props.logoutElement?.component;

    props.logoutWebButton.props.onItemClick = handlendShowLogout;
    props.logoutMobileButton.props.onItemClick = handlendShowLogout;


    
    return (
        <>
        <MaterialUI.Box sx={{ display: "flex" }}>
            
            <MaterialUI.CssBaseline />
            
            <MaterialUI.AppBar 
                position="fixed" 
                elevation = {0}
                color={'transparent'}>

                    <MaterialUI.Toolbar  >
                        <IconButton onClick={handledSideBarClick}>
                            <MenuIcon />
                        </IconButton>
                    </MaterialUI.Toolbar>
            </MaterialUI.AppBar>

            <SideBar
                drawerWidth = {drawerWidth }  
                items={props.menuItems}
                headerImage={logo}
                logoutWebButton={props?.logoutWebButton}
                logoutMobileButton={props?.logoutMobileButton}
                handleDrawerToggleWeb={handleDrawerToggleWeb}
                openMenu={openMenu}
            />

            <MaterialUI.Box component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}>

                <MaterialUI.Box sx={{ m: 4, pb: 5 }}> 
                 
                    <Outlet />
                </MaterialUI.Box>              
            </MaterialUI.Box>
            
            {LogoutElement && 
                <LogoutElement
                    {...props.logoutElement?.props}
                    open={openLogout}
                    onNegativeOptionListener ={()=> setOpenLogout(false)}
                    />
            }

            {showFirstPass &&
                <MaterialUI.Dialog
                    open={showFirstPass}>
                    
                    <MaterialUI.DialogContent dividers={true} sx={{ width: 350 }}>

                        {
                            changeFirstPassSuccessful? 

                                <MaterialUI.Typography variant="body1">
                                    {Strings.change_pass_external_successful}
                                </MaterialUI.Typography>
                                :
                                <ChangePasswordView 
                                    viewModel={changePassViewModel}
                                    onLoadingChangeListener ={setFirstPasswordLoading}
                                    onChangePassSuccessful = {onChangePassSuccesful}/>
                        }
                        
                            
                    </MaterialUI.DialogContent>
                    <LoadingScreen loading={firstPasswordLoading}/>
                </MaterialUI.Dialog>
            }

           
        </MaterialUI.Box>
        
        </>
    );
    
}