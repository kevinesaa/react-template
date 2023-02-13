import React from "react";

import * as MaterialUI from "@mui/material";
import {  Outlet  } from "react-router-dom";

import SideBar from "./sidebar/SideBar";
import logo from "../../../_Resources/images/logo.png"

export default function Home (props)
{
    const drawerWidth = 240;
    const selectedItem = props.selectedItem;
    const [openLogout, setOpenLogout] = React.useState(false);
    const LogoutElement = props.logoutElement?.component;

    const handlendShowLogout = (item) => {
        setOpenLogout(!openLogout);
    }

    

    props.logoutWebButton.props.onItemClick = handlendShowLogout;
    props.logoutMobileButton.props.onItemClick = handlendShowLogout;

    return (
        <>
        <MaterialUI.Box sx={{ display: "flex" }}>
            <MaterialUI.CssBaseline />
        

            <SideBar 
                drawerWidth = {drawerWidth }  
                items={props.menuItems}
                selectedItem = {selectedItem}
                headerImage={logo}
                logoutWebButton={props?.logoutWebButton}
                logoutMobileButton={props?.logoutMobileButton}
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