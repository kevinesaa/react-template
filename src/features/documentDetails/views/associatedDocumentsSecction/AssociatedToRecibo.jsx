import Constants from "../../../../_commons/Constants";
import * as MaterialUI from "@mui/material";


const ID_BOLIVAR_CURRENCY = Constants.ID_BOLIVAR_CURRENCY;


export default function AssociatedToRecibo(props)
{ 
    
    let amount = props.recibo.MONTO_DOLAR;
    if( props.recibo.ID_MONEDA === ID_BOLIVAR_CURRENCY)
    {
        amount = props.recibo.MONTO_LOCAL;
    }
    return (
        <>
        <MaterialUI.TableRow >
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.recibo.FACTURA}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {`${amount} ${props.recibo.MONEDA}`}
            </MaterialUI.TableCell>
           
        </MaterialUI.TableRow>
        </>
    );
}