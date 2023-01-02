import React, { Fragment } from 'react';
import * as MaterialUI from "@mui/material";
import { Link } from 'react-router-dom';


export default function MobileItem(props) {
    
    const onItemClickListener = (item) => {
        
        if(props.onItemClick){
            props.onItemClick(item);
        }
    }
    
    const isSelected = props.selectedIndex === props.id;

    return (
        <Fragment key={props.id}>
            <Link onClick={()=>onItemClickListener(props)} to={props.path} style={{ textDecoration: "none", color: "#9D9D9C" }}>
                <MaterialUI.ListItem disablePadding>
                    <MaterialUI.ListItemButton>
                        <MaterialUI.ListItemIcon>
                            
                        </MaterialUI.ListItemIcon>
                        {
                            isSelected? 
                                <MaterialUI.ListItemText primary={props.title} 
                                    sx={{ opacity: props.isOpen ? 1 : 0, color: "primary.main" }}/> 
                                :<MaterialUI.ListItemText primary={props.title} />
                        }
                    </MaterialUI.ListItemButton>
                </MaterialUI.ListItem> 
            </Link>
        </Fragment>
    );
}