import CashDocumentTableRow from "../tableRowHolder/CashDocumentTableRow";
import ElectronicDocumentTableRow from "../tableRowHolder/ElectronicDocumentTableRow";
import Constants from "../../../../_commons/Constants";


export default function DocumentsTableAdapter(props) 
{
    
    return (<>
        
        {props.items == null || props.items.length == 0 ? <></> : 
            props.items
                .map((item,index ) => {

                    if(item.tipo_documento == Constants.DOC_TYPE_ANEXO_ID) 
                    {
                        return (<CashDocumentTableRow 
                                    key={`doc-${index}`} 
                                    item={item}
                                    onItemClick={props.onItemClickListener} />
                            );
                    }
                    
                    if(item.tipo_documento == Constants.DOC_TYPE_RECIBO_ID) 
                    {
                        return (<ElectronicDocumentTableRow 
                                    key={`doc-${index}`} 
                                    item={item}
                                    onItemClick={props.onItemClickListener} />
                            );
                    }
                    
                })
        }
        
    </>);
}