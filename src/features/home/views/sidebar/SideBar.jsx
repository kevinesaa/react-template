import React  from 'react';
import { useLocation  } from "react-router-dom";
import PropTypes from 'prop-types';
import * as MaterialUI from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import DrawerHeader from './DrawerHeader';
import MobileItem from './MobileItem';
import WebItem from './WebItem';



function MenuItemsWeb(props) {
    
    const handledItemClick = (item) => {
        if(props.onItemClick){
            props.onItemClick(item);
        }
    }
    
    const location = useLocation();
    const currentPathIndex = props.items? props.items.findIndex(item => 
        location.pathname.startsWith(item.path)
    ):-1;
    
    const menuItems = props.items.map((item, index) => {
        
        return (
            <WebItem isOpen={props.isOpen}
                key={index} 
                id={index}
                selectedIndex={ currentPathIndex} 
                path={item.path} 
                title={item.title} 
                iconUrl={item.icon} 
                onItemClick={handledItemClick} />
        );
      });
    
    return (menuItems);
    
}


function MenuItemsMobile(props) {
    
    const handledItemClick = (item) => {
        if(props.onItemClick){
            props.onItemClick(item);
        }
    }

    const menuItems = props.items.map((item, index) => {
        return (
            <MobileItem isOpen={props.isOpen} 
                key={index} 
                id={index}
                selectedIndex={ props.selectedIndex}
                path={item.path} 
                title={item.title} 
                onItemClick={handledItemClick} />
        );
      });
    
    return (menuItems);
    
}

const SideBar = (props) => {

    
    const drawerWidth = props.drawerWidth;
    const handleDrawerToggleWeb = () => {
        if(props.handleDrawerToggleWeb) {
            props.handleDrawerToggleWeb();
        }
    };
    
    const LogoutWebButton = props.logoutWebButton?.component;
   
    return (
        <>
        <MaterialUI.Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders">

        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}


            <MaterialUI.Drawer
            
                open={props.openMenu}
                onClose={handleDrawerToggleWeb}
                anchor="left"
                variant="persistent"
                sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box'
                        }
                  }}
            /*Drawer*/ >

                <DrawerHeader
                    sx={{
                        justifyContent: "center",
                    }}>
                    
                    <IconButton onClick={handleDrawerToggleWeb}>
                        <MenuIcon />
                    </IconButton>

                    <MaterialUI.Box
                        component="img"
                        sx={{
                            width: 200,
                            maxHeight: { xs: 233, md: 167 },
                            maxWidth: { xs: 350, md: 250 },
                        }}
                        src={props.headerImage} />
                    
                </DrawerHeader>
                <MaterialUI.List>
                    <MenuItemsWeb 
                        items = {props.items?props.items:[]}
                        isOpen = {props.openMenu}
                    />
                    
                    {LogoutWebButton &&
                        <LogoutWebButton
                            {...props.logoutWebButton?.props}
                            id="side-bar-logout-button-web"
                            isOpen = {props.openMenu}/>
                    }
                </MaterialUI.List>
            </MaterialUI.Drawer>
        </MaterialUI.Box>
        </>
    );
}

export default SideBar;

