import React, { useState } from 'react';

import * as MaterialUI from "@mui/material";
import {  Outlet  } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SideBar from "./sidebar/SideBar";
import logo from "../../../_Resources/images/logo.png"


export default function Home (props)
{
    
    const [drawerWidth,setDrawerWidth ] = useState(240); 
    const [openLogout,setOpenLogout] = React.useState(false);
    const [openMenu,setOpenMenu] = React.useState(true);
    const LogoutElement = props.logoutElement?.component;

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
        </MaterialUI.Box>
        </>
    );
    
}