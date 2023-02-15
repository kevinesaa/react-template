import Strings from "../../../../_Resources/strings/strings";
import DocumentTableRow from "./DocumentTableRow";

export default function CashDocumentTableRow(props) 
{
    const handleClick = (item) => {
        
        if(props.onItemClick) {
            props.onItemClick(item)
        }
    }

    const item = props.item;
    
    return (
        <DocumentTableRow
            onItemClick={handleClick}
            item={item}
            id={item.id_documento}
            type={Strings.text_cash_document}
            document_date={`${item.detail.FECHA_DOCUMENTO}`}
            document_number={`${item.detail.id_documento_afv}`}
            amount={`${Number(item.detail.MONTO).toFixed(2)} ${item.detail.MONEDA}`}
            amount_edit={item.detail.MONTO_EDITADO == null? "-" : `${Number(item.detail.MONTO_EDITADO).toFixed(2)} ${item.detail.MONEDA}`}
            paymentType={"DEPOSITO"}
            documentReference={item.referencia? `${item.referencia}`: `${item.detail.REFERENCIA}`}
            bank={`${item.detail.BANCO}`}
            bankAccount={`${item.detail.NUMERO_CUENTA_BANCARIA}`}
            routeCode={`${item.detail.NOMBRE_ZONA}`}
            createBy={`${item.detail.USUARIO_CREACION}`}
            status={item.estatus}
        />
    );
}
