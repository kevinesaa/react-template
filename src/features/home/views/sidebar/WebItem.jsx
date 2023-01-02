import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as MaterialUI from "@mui/material";


export default function WebItem(props) 
{
    const onItemClickListener = (item) => {
        
        if(props.onItemClick){
            props.onItemClick(item);
        }
    }
    
    const isSelected = props.selectedIndex === props.id;

    return (
        <Fragment key={ props.id}>
            <Link onClick={()=>onItemClickListener(props)}
                to={props.path} 
                style={{ textDecoration: "none", color: "#9D9D9C" }}>
                
                <MaterialUI.ListItem disablePadding>
                    <MaterialUI.ListItemButton  sx={{
                                minHeight: 45,
                                px: 2.5,
                                justifyContent: props.isOpen ? "initial" : "center",
                                borderBottom: 1,
                                borderColor: "secondary.light",
                            }}>
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