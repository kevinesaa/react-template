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
            id={item.id_documento}
            type="Anexo"
            document_date={`${item.detail.FECHA_DOCUMENTO}`}
            document_number={`${item.detail.id_documento_afv}`}
            amount={`${Number(item.detail.MONTO).toFixed(2)} ${item.detail.MONEDA}`}
            amount_edit={item.detail.MONTO_EDITADO == null? "-" : `${Number(item.detail.MONTO_EDITADO).toFixed(2)} ${item.detail.MONEDA}`}
            paymentType={"DEPOSITO"}
            documentReference={`${item.detail.REFERENCIA}`}
            bank={`${item.detail.BANCO}`}
            bankAccount={`${item.detail.NUMERO_CUENTA_BANCARIA}`}
            routeCode={`${item.detail.NOMBRE_ZONA}`}
            status={item.estatus}
        />
    );
}
