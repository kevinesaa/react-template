import React, { Fragment } from 'react';
import * as MaterialUI from "@mui/material";


export default function ButtonMobileLogoutSideBar(props) {
    
    const onItemClickListener = (item) => {
        
        if(props.onItemClick){
            props.onItemClick(item);
        }
    }
    
    

    return (
        <Fragment key={props.id}>
            
            <MaterialUI.ListItem disablePadding
                    onClick={()=>onItemClickListener(props)} 
                    >
                <MaterialUI.ListItemButton
                    style={{ textDecoration: "none", color: "#9D9D9C" }}>
                    
                    <MaterialUI.ListItemIcon>
                        
                    </MaterialUI.ListItemIcon>

                    <MaterialUI.ListItemText primary={props.title} />
                </MaterialUI.ListItemButton>
            </MaterialUI.ListItem> 
        
        </Fragment>
    );
}