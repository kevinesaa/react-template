import * as MaterialUI from "@mui/material";


export default function CustomTextField(props) {

    const onChangeText = (event) => {
        
        if(props.onChangeText) {
            props.onChangeText(event.target.value);
        }
    }

    const disabled = props.disabled == null ? false : props.disabled;

    return (<>
        <MaterialUI.Grid item>
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