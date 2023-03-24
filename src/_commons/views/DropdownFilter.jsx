import { Component } from "react";
import * as MaterialUI from "@mui/material";

export default function DropdownFilter(props) {

    const handledOnSelectItem = (event) => {

        if(props.onSelectItem) {
            
            const index = event.target.value;
            const value = props.values[index];
            props.onSelectItem(value);
        }
    }

    return (
        <MaterialUI.FormControl sx={props.sx}>
            <MaterialUI.InputLabel id={props.labelId}>
                {props.label}
            </MaterialUI.InputLabel>
            <MaterialUI.Select 
                size="small"
                autoWidth
                labelId={props.labelId}
                label={props.label}
                defaultValue={props.defaultIndex}
                onChange={handledOnSelectItem}
                
                >
    
                {props.values && props.values.length > 0 &&
                    props.values.map((item,index) => {
                            return (
                                <MaterialUI.MenuItem key={`${props.labelId}-item-${index}`} value={index}>
                                    {item.name}
                                </MaterialUI.MenuItem>
                            )}
                        )
                    
                }
            </MaterialUI.Select>
        </MaterialUI.FormControl>
    );
}