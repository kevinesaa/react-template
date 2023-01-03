import AnexoTableRow from "./tableRowHolder/AnexoTableRow";
import ReciboTableRow from "./tableRowHolder/ReciboTableRow";

const ANEXO_TYPE_ID = 1;
const RECIBO_TYPE_ID = 2;

export default function DocumentsTableAdapter(props) 
{
    return (<>
        
        {props.items == null || props.items.length == 0 ? <></> : 
            props.items
                .map((item,index ) => {

                    if(item.tipo_documento == ANEXO_TYPE_ID) 
                    {
                        return (<AnexoTableRow 
                                    key={`doc-${index}`} 
                                    item={item} />
                            );
                    }
                    
                    if(item.tipo_documento == RECIBO_TYPE_ID) 
                    {
                        return (<ReciboTableRow 
                                    key={`doc-${index}`} 
                                    item={item} />
                            );
                    }
                    
                })
        }
        
    </>);
}