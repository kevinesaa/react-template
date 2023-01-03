import * as MaterialUI from "@mui/material";

export default function DocumentTableRow(props) 
{
    
    return (
        <MaterialUI.TableRow>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.tipo}
            </MaterialUI.TableCell>
        </MaterialUI.TableRow>
    );
}