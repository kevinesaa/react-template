
import * as MaterialUI from "@mui/material";

export default function Dropdown(props){
    
    const handledOnSelectItem = (event) => {

        if(props.onSelectItem) {
            
            props.onSelectItem(event.target.value)
        }
    }

    const items = props.items ? props.items.map(item => {
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
                defaultValue={props.defaultValue}
                onChange={handledOnSelectItem}
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
                    
                    <MaterialUI.MenuItem key={`placeholder-${props.id}`} value={undefined}>
                        {props.placeholder}
                    </MaterialUI.MenuItem>
                    {items}

            </MaterialUI.Select>
        </MaterialUI.FormControl>
    );
}