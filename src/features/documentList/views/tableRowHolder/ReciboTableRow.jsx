import DocumentTableRow from "./DocumentTableRow";

const ID_BOLIVAR_CURRENCY = 205;

export default function ReciboTableRow(props) 
{
    const handleClick = (item) => {
        
        if(props.onItemClick) {
            props.onItemClick(item)
        }
    }

    const item = props.item;
    let amount = item.detail.MONTO_DOLAR;
    if( item.detail.ID_MONEDA === ID_BOLIVAR_CURRENCY)
    {
        amount = item.detail.MONTO_BS;
    }
    return (
        <DocumentTableRow
            onItemClick={handleClick}
            item={item}
            type="Recibo"
            document_date={`${item.detail.FECHA_RECIBO}`}
            document_number={`${item.detail.id_documento_afv}`}
            amount={`${amount}`}
            amount_edit={"-"}
            paymentType={`${item.detail.FORMA_PAGO}`}
            documentReference={`${item.detail.NUMERO_REFERENCIA}`}
            currency={`${item.detail.MONEDA}`}
            bank={`${item.detail.BANCO}`}
            bankAccount={`${item.detail.NUMERO_CUENTA_BANCARIA}`}
            clientName={`${item.detail.CLIENTES[0].RAZON_SOCIAL_CLIENTE}`}
            clientCode={`${item.detail.CLIENTES[0].CODIGO_DE_CLIENTE}`}
            clientDNI={`${item.detail.CLIENTES[0].RIF_CLIENTE}`}
            sellerName={`${item.detail.VENDEDOR}`}
            routeCode={`${item.detail.ID_ZONA}`}
            status={item.estatus}
        />
    );
}