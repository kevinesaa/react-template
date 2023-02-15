import * as MaterialUI from "@mui/material";
import Strings from "../../../../_Resources/strings/strings";



export default function DocumentTableRow(props) 
{
    const handleClick = (item) => {
        
        if(props.onItemClick) {
            props.onItemClick(item)
        }
    }


    const clientCode = props.clients?.map(c => c.CODIGO_DE_CLIENTE).join(" ; ")
    
    return (
        <MaterialUI.TableRow hover onClick={event => handleClick(props.item)}>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.id}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.type}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.document_number}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.item.estatus < 3?"-":props.item.fecha_conciliacion?`${props.item.fecha_conciliacion.substring(0,10)}`: `${props.item.update_at.substring(0,10)}`}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.item.estatus < 3 ? Strings.documents_list_status_no_conciliated:Strings.documents_list_status_conciliated}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.createBy}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.routeCode}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.document_date.substring(0,10)}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.documentReference}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.amount}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.amount_edit}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.bank}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {props.bankAccount}
            </MaterialUI.TableCell>
            <MaterialUI.TableCell component="th" scope="row" align="center">
                {clientCode}
            </MaterialUI.TableCell>
        </MaterialUI.TableRow>
    );
}