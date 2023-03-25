import * as MaterialUI from "@mui/material";
import * as MaterialIcons from '@mui/icons-material/';
import { useState } from "react";

export default function PasswordInput(props) {

    const [showPassword,setShowPassword] = useState(false);
    
    const handledShowPass = () => {
        setShowPassword(!showPassword);
    }

    const onChangeText = (event) => {
        
        if(props.onChangeText) {
            props.onChangeText(event.target.value);
        }
    }

    return (<>
        <MaterialUI.Grid item>
            <MaterialUI.Paper elevation={0}>
                <MaterialUI.FormControl required fullWidth>
                    <MaterialUI.InputLabel>{props.label}</MaterialUI.InputLabel>
                    
                    <MaterialUI.OutlinedInput
                        label={props.label}
                        onChange={onChangeText}
                        type={showPassword ? "text" : "password"}
                        value={props.textValue}
                        variant="outlined"
                        autoComplete="off"
                        endAdornment = {

                            <MaterialUI.InputAdornment position="end">
                                <MaterialUI.IconButton onClick={handledShowPass}>
                                    {showPassword ? (
                                        <MaterialUI.Tooltip title={props.tooltipHideText}>
                                            <span>
                                                <MaterialIcons.VisibilityOff />
                                            </span>
                                        </MaterialUI.Tooltip>
                                    ) : (
                                        <MaterialUI.Tooltip title={props.tooltipShowText}>
                                            <span>
                                                <MaterialIcons.Visibility />
                                            </span>
                                        </MaterialUI.Tooltip>
                                    )}
                                </MaterialUI.IconButton>
                            </MaterialUI.InputAdornment>
                        }
                />
                </MaterialUI.FormControl>
            </MaterialUI.Paper>
        </MaterialUI.Grid>
    </>);
}