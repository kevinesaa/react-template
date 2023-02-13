import * as MaterialUI from "@mui/material";


export default function CustomTextField(props) {

    const onChangeText = (event) => {
        
        if(props.onChangeText) {
            props.onChangeText(event.target.value);
        }
    }

    
    return (<>
        <MaterialUI.Grid item>
            <MaterialUI.Paper elevation={0}>
                <MaterialUI.TextField
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