import * as MaterialUI from "@mui/material";
import Constants from "../../../../_commons/Constants";
import Strings from "../../../../_Resources/strings/strings";

function AmountSection(props) {
    

    return (<>
        <MaterialUI.Stack direction="row" spacing={2}>
            <MaterialUI.Typography variant="body2"><b>{Strings.documents_details_amount_title}</b> {Number(props.amount).toFixed(2)} {props.currency}</MaterialUI.Typography>
            {props.show_edit_amount && Number(props.edit_amount) > 0 &&
                <MaterialUI.Typography variant="body2"><b>{Strings.documents_details_edit_amount_title}</b> {Number(props.edit_amount).toFixed(2)} {props.currency}</MaterialUI.Typography>
            }
            { props.show_overpayment && Number(props.overpayment) > 0 &&
                <MaterialUI.Typography variant="body2"><b>{Strings.documents_details_overpayment_title}</b> {Number(props.overpayment).toFixed(2)} {props.currency}</MaterialUI.Typography>
            }
            
        </MaterialUI.Stack>
    </>);
}

export default function AmountSectionAdapter(props) {

    const doc = props.document;
    
    return ( 
        <>
        {
           doc && <> {
            Constants.DOC_TYPE_ANEXO_ID == doc?.tipo_documento ? 
            //anexo
             <AmountSection 
                amount={doc?.detail?.MONTO} 
                currency={doc?.detail?.MONEDA} 
                show_edit_amount={doc?.detail?.MONTO_EDITADO != null} 
                edit_amount={doc?.detail?.MONTO_EDITADO}
                show_overpayment={doc?.detail?.SOBRE_PAGO != null}
                overpayment={doc?.detail?.SOBRE_PAGO}/>
             :
             //recibo
            <AmountSection 
                amount={doc?.detail && Constants.ID_DOLLAR_CURRENCY == doc?.detail.ID_MONEDA ? doc?.detail.MONTO_DOLAR : doc?.detail?.MONTO_LOCAL} 
                currency={doc?.detail?.MONEDA} 
                show_edit_amount={false} 
                show_overpayment={doc?.detail?.SOBRE_PAGO != null}
                overpayment={doc?.detail && Constants.ID_DOLLAR_CURRENCY == doc?.detail.ID_MONEDA ? doc?.detail.SOBRE_PAGO_DOLAR : doc?.detail?.SOBRE_PAGO_LOCAL}/>
           }</>
                
        }
    </>);
}

