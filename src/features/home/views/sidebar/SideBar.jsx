import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Drawer from "@mui/material/Drawer";
import List from '@mui/material/List';



import DrawerHeader from './DrawerHeader';
import MobileItem from './MobileItem';
import WebItem from './WebItem';



function MenuItemsWeb(props) {
    
    const handledItemClick = (item) => {
        if(props.onItemClick){
            props.onItemClick(item);
        }
    }

    const menuItems = props.items.map((item, index) => {
        
        return (
            <WebItem isOpen={props.isOpen}
                key={index} 
                id={index}
                selectedIndex={ props.selectedIndex} 
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

    const drawerWidth = props.drawerWidth?props.drawerWidth:240;
    const { window } = props;
    const [openMenu] = React.useState(true);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [selectedIndex,setSelectedIndex] = React.useState(props.selectedItem);
    const container = window !== undefined ? () => window().document.body : undefined;
    
    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };
    
    const handledItemClick = (item) => {
        setSelectedIndex(item.id);
    }
    
    return (
        <>
        <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders">

        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: "block", sm: "none" },
                  "& .MuiDrawer-paper": {
                    boxSizing: "border-box",
                    width: drawerWidth,
                  },
                }}
            /*Drawer*/ >

            <DrawerHeader
              sx={{
                justifyContent: "center",
              }}
            >
              <Box
                component="img"
                sx={{
                  width: 200,
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
                src={props.headerImage}
               
              />
            </DrawerHeader>
                <List>
                    <MenuItemsMobile 
                            items={props.items?props.items:[]}
                            isOpen={mobileOpen}
                            selectedIndex = {selectedIndex}
                        />
                </List>
            </Drawer>

            <Drawer
                open={openMenu}
                variant="permanent"
                sx={{
                    display: { xs: "none", sm: "block" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                    },
                }}
            /*Drawer*/ >

                <DrawerHeader
                    sx={{
                        justifyContent: "center",
                    }}
                /*DrawerHeader*/ >
                    <Box
                        component="img"
                        sx={{
                            width: 200,
                            maxHeight: { xs: 233, md: 167 },
                            maxWidth: { xs: 350, md: 250 },
                        }}
                        
                        src={props.headerImage}
                    />
                    
                </DrawerHeader>
                <List>
                    <MenuItemsWeb 
                        items = {props.items?props.items:[]}
                        isOpen = {openMenu}
                        selectedIndex = {selectedIndex}
                        onItemClick = {handledItemClick}
                    />
                </List>
            </Drawer>
        </Box>
        </>
    );
}

SideBar.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default SideBar;