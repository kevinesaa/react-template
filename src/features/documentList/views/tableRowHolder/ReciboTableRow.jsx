import DocumentTableRow from "./DocumentTableRow";

export default function ReciboTableRow(props) 
{
    const item = props.item;
    return (
        <DocumentTableRow
            type="Recibo"
            document_date={``}
            document_number={``}
            amount={``}
            amount_edit={"-"}
            currency={``}
            bank={``}
            clientName={``}
            clientCode={``}
            clientDNI={``}
            sellerName={``}
            routeCode={``}
            status={``}
            update_at={``}
        />
    );
}