import Constants from "../../../../_commons/Constants";
import * as MaterialUI from "@mui/material";


const ID_DOLLAR_CURRENCY = Constants.ID_DOLLAR_CURRENCY;


export default function AssociatedToRecibo(props)
{ 
    
    let amount = props.recibo.MONTO_DOLAR;
    if( props.recibo.currency_id != ID_DOLLAR_CURRENCY)
    {
        amount = props.recibo.MONTO_LOCAL;
    }
    return (
        <>
        <MaterialUI.TableRow >
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.recibo.DOCUMENTO}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {`${Number(amount).toFixed(2)} ${props.currency}`}
            </MaterialUI.TableCell>
           
        </MaterialUI.TableRow>
        </>
    );
}