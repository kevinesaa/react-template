import * as MaterialUI from "@mui/material";


export default function CustomTextField(props) {

    const onChangeText = (event) => {
        
        if(props.onChangeText) {
            props.onChangeText(event.target.value);
        }
    }

    const disabled = props.disabled == null ? false : props.disabled;
    const columnsInGrid = props.columnsInGrid == null?12:props.columnsInGrid;

    return (<>
        <MaterialUI.Grid item xs={columnsInGrid}>
            <MaterialUI.Paper elevation={0}>
                <MaterialUI.TextField
                    disabled ={disabled}
                    required = {props.required}
                    fullWidth
                    onChange={onChangeText}
                    type={props.type}
                    value={props.textValue}
                    label={props.label}/>

            </MaterialUI.Paper>
        </MaterialUI.Grid>
    </>);
}