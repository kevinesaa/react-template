import Constants from "../../../../_commons/Constants";
import DocumentTableRow from "./DocumentTableRow";


const ID_DOLAR_CURRENCY = Constants.ID_DOLLAR_CURRENCY;

export default function ReciboTableRow(props) 
{
    const handleClick = (item) => {
        
        if(props.onItemClick) {
            props.onItemClick(item)
        }
    }

    const item = props.item;
    let amount = item.detail.MONTO_DOLAR;
    if( item.detail.ID_MONEDA != ID_DOLAR_CURRENCY)
    {
        amount = item.detail.MONTO_LOCAL;
    }
    return (
        <DocumentTableRow
            onItemClick={handleClick}
            item={item}
            id={item.id_documento}
            type="Recibo"
            document_date={`${item.detail.FECHA_DOCUMENTO}`}
            document_number={`${item.detail.id_documento_afv}`}
            amount={`${Number(amount).toFixed(2)} ${item.detail.MONEDA}`}
            amount_edit={"-"}
            documentReference={`${item.detail.REFERENCIA}`}
            bank={`${item.detail.BANCO}`}
            bankAccount={`${item.detail.NUMERO_CUENTA_BANCARIA}`}
            routeCode={`${item.detail.NOMBRE_ZONA}`}
            status={item.estatus}
        />
    );
}