import React, { Fragment } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

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
            <Link onClick={()=>onItemClickListener(props)} to={props.path} style={{ textDecoration: "none", color: "#9D9D9C" }}>
                <ListItem   disablePadding>
                    <ListItemButton  sx={{
                                minHeight: 45,
                                px: 2.5,
                                justifyContent: props.isOpen ? "initial" : "center",
                                borderBottom: 1,
                                borderColor: "secondary.light",
                            }}>
                        <ListItemIcon sx={{
                                    minWidth: 0,
                                    mr: 3,
                                    justifyContent: "center",
                                }}>
                            
                             <Box
                                component="img"
                                sx={{
                                    width: 20,
                                    maxHeight: { xs: 15, md: 20 },
                                    maxWidth: { xs: 15, md: 20 },
                                }}
                                src={props.iconUrl?props.iconUrl:""}/>

                        </ListItemIcon>
                        {
                            isSelected? 
                                <ListItemText primary={props.title} 
                                    sx={{ opacity: props.isOpen ? 1 : 0, color: "primary.main" }}/> 
                                :<ListItemText primary={props.title} />
                        }
                        
                    </ListItemButton>
                </ListItem> 
            </Link>
        </Fragment>
    );
}