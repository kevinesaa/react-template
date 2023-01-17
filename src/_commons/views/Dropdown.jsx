
import * as MaterialUI from "@mui/material";

export default function Dropdown(props){
    
    const handledOnSelectItem = (event) => {

        if(props.onSelectItem) {
            if(!event.target.value.holderItem){
                
                props.onSelectItem(event.target.value);
            }
            
        }
    }
    
    const items = props.items && props.items.length > 0? props.items.map(item => {
        return <MaterialUI.MenuItem key={item.id} value={item}>{item.text}</MaterialUI.MenuItem>
    }):<></>;
    
    return (
        <MaterialUI.FormControl sx={{ m: 1, minWidth: 150 }} >
            <MaterialUI.InputLabel id={`label-${props.id}`}>
                {props.label}
            </MaterialUI.InputLabel>
            <MaterialUI.Select
                id={props.id}
                labelId={`label-${props.id}`}
                onChange={handledOnSelectItem}
                defaultValue={props.defaultValue}
                value={props.value}
                label={props.label}
                autoWidth={true}
                MenuProps= { 
                    {
                        PaperProps: {
                            style: {
                                maxHeight:220 
                            }
                        }
                    }
                }>
                    
                    <MaterialUI.MenuItem key={`placeholder-${props.id}`} value={{id:-1,holderItem:1,text:props.placeholder}}>
                        {props.placeholder}
                    </MaterialUI.MenuItem>
                    {items}

            </MaterialUI.Select>
        </MaterialUI.FormControl>
    );
}