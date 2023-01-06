import DocumentTableRow from "./DocumentTableRow";

export default function AnexoTableRow(props) 
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
            type="Anexo"
            document_date={`${item.detail.FECHA_EMISION_ANEXO}`}
            document_number={`${item.detail.id_documento_afv}`}
            amount={`${Number(item.detail.MONTO_ANEXO).toFixed(2)} ${item.detail.MONEDA}`}
            amount_edit={item.detail.MONTO_EDITADO == null? "-" : `${Number(item.detail.MONTO_EDITADO).toFixed(2)} ${item.detail.MONEDA}`}
            paymentType={"DEPOSITO"}
            documentReference={`${item.detail.NUMERO_DEPOSITO}`}
            bank={`${item.detail.BANCO}`}
            bankAccount={`${item.detail.NUMERO_CUENTA_BANCARIA}`}
            /*
            clientName={`${item.detail?.CLIENTES[0].RAZON_SOCIAL_CLIENTE}`}
            clientCode={`${item.detail?.CLIENTES[0].CODIGO_DE_CLIENTE}`}
            clientDNI={`${item.detail?.CLIENTES[0].RIF_CLIENTE}`}
            sellerName={`${item.detail.VENDEDOR}`}
            */
            routeCode={`${item.detail.ID_ZONA}`}
            status={item.estatus}
        />
    );
}
