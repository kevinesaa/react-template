import React from "react";
import { Component } from "react";


import Toolbar from "@mui/material/Toolbar";
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/Box';
import AppBar from "@mui/material/AppBar";
import {  Outlet, useLocation  } from "react-router-dom";
import SideBar from "./sidebar/SideBar";
import logo from "../../../_Resources/images/logo.png"

export default function Home (props)
{
    const drawerWidth = 240;
    const selectedItem = props.selectedItem;
    
    return (
        <>
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
        

            <SideBar 
                drawerWidth = {drawerWidth }  
                items={props.menuItems}
                selectedItem = {selectedItem}
                headerImage={logo}
            />
            <Box component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                }}>
                <Box sx={{ m: 4, pb: 5 }}> 
                    <Outlet />
                </Box>  
            </Box>
        </Box>
        </>
    );
    
}