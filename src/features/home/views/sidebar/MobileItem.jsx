import React, { Fragment } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
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
                <ListItem   disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            
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