import Constants from "../../../../_commons/Constants";
import * as MaterialUI from "@mui/material";
import TableHeader from "../../../../_commons/views/tableComponents/TableHeader";
import AssociatedToAnexo from "./AssociatedToAnexo";
import AssociatedToRecibo from "./AssociatedToRecibo";


export default function AssociatedDocumentsAdapter(props)
{ 

    const items = props.items?props.items:[];
    const showByType = props.doc_type == Constants.DOC_TYPE_ANEXO_ID ||
            props.doc_type == Constants.DOC_TYPE_RECIBO_ID;

    return (
        <>
            {
                items.length === 0 ? <>
                    <MaterialUI.Typography variant="body2">
                        <b>Documentos no encontrados</b>
                    </MaterialUI.Typography>
                </> :
                <> {!showByType &&
                    <MaterialUI.Typography variant="body2">
                        <b>Documentos desconocidos</b>
                    </MaterialUI.Typography>
                }
               
                { showByType && props.show_list &&
                    <MaterialUI.TableContainer sx={{ maxHeight: 250 }}>
                            <MaterialUI.Table
                                stickyHeader
                                aria-label="sticky table"
                                size="small">
                                
                                <TableHeader columns={[{title:"Documento"},{title:"Monto"}]}/>
                                <MaterialUI.TableBody>
                                {
                                    props.doc_type == Constants.DOC_TYPE_ANEXO_ID ?
                                        items.map((item,index) => {
                                                return <AssociatedToAnexo 
                                                    key={`asoc-doc-${index}`} 
                                                    anexo={item}
                                                    currency_id = {props.currency_id} 
                                                    currency={props.currency} />
                                            })
                                        :items.map((item,index) => {
                                            return <AssociatedToRecibo 
                                                key={`asoc-doc-${index}`} 
                                                recibo={item} 
                                                currency_id = {props.currency_id} 
                                                currency={props.currency} />
                                        })
                                }

                                </MaterialUI.TableBody>
                            </MaterialUI.Table>
                    </MaterialUI.TableContainer>
                }   
                </>
            }
        </>
    );
}