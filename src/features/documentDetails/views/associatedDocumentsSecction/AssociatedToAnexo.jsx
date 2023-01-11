import Constants from "../../../../_commons/Constants";
import * as MaterialUI from "@mui/material";


export default function AssociatedToAnexo(props)
{ 

    return (
        <>
        <MaterialUI.TableRow >
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.anexo.DOCUMENTO}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {`${Number(props.anexo.MONTO).toFixed(2)} ${props.currency}`}
            </MaterialUI.TableCell>
           
        </MaterialUI.TableRow>
        </>
    );
}