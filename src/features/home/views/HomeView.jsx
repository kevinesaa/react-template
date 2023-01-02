import React from "react";

import * as MaterialUI from "@mui/material";
import {  Outlet  } from "react-router-dom";

import SideBar from "./sidebar/SideBar";
import logo from "../../../_Resources/images/logo.png"

export default function Home (props)
{
    const drawerWidth = 240;
    const selectedItem = props.selectedItem;
    
    return (
        <>
        <MaterialUI.Box sx={{ display: "flex" }}>
            <MaterialUI.CssBaseline />
        

            <SideBar 
                drawerWidth = {drawerWidth }  
                items={props.menuItems}
                selectedItem = {selectedItem}
                headerImage={logo}
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
        </MaterialUI.Box>
        </>
    );
    
}