import React, { Fragment } from 'react';
import * as MaterialUI from "@mui/material";


export default function ButtonWebLogoutSideBar(props) {

    const onItemClickListener = (item) => {
        
        if(props.onItemClick){
            props.onItemClick(item);
        }
    }

    return(
        <Fragment key={ props.id}>
            
            <MaterialUI.ListItem 
                disablePadding
                onClick={()=>onItemClickListener(props)}>
                
                <MaterialUI.ListItemButton  sx={{
                            minHeight: 45,
                            px: 2.5,
                            justifyContent: props.isOpen ? "initial" : "center",
                            borderBottom: 1,
                            borderColor: "secondary.light",
                        }}
                        style={{ textDecoration: "none", color: "#9D9D9C" }}>
                    
                    <MaterialUI.ListItemIcon sx={{
                                minWidth: 0,
                                mr: 3,
                                justifyContent: "center",
                            }}>
                        
                        <MaterialUI.Box
                            component="img"
                            sx={{
                                width: 20,
                                maxHeight: { xs: 15, md: 20 },
                                maxWidth: { xs: 15, md: 20 },
                            }}
                            src={props.iconUrl?props.iconUrl:""}/>

                    </MaterialUI.ListItemIcon>

                    <MaterialUI.ListItemText primary={props.title}/>

                </MaterialUI.ListItemButton>
            </MaterialUI.ListItem> 
        </Fragment>
    );
}