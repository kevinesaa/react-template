import Constants from "../../../../_commons/Constants";
import * as MaterialUI from "@mui/material";


export default function AssociatedToAnexo(props)
{ 

    return (
        <>
        <MaterialUI.TableRow >
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.anexo.RECIBO}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {`${props.anexo.MONTO} ${props.anexo.MONEDA}`}
            </MaterialUI.TableCell>
           
        </MaterialUI.TableRow>
        </>
    );
}