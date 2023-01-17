import Constants from "../../../../_commons/Constants";
import * as MaterialUI from "@mui/material";
import TableHeader from "../../../../_commons/views/tableComponents/TableHeader";
import AssociatedToAnexo from "./AssociatedToAnexo";
import AssociatedToRecibo from "./AssociatedToRecibo";
import Strings from "../../../../_Resources/strings/strings";


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
                        <b>{Strings.documents_details_attachments_not_found_title}</b>
                    </MaterialUI.Typography>
                </> :
                <> {!showByType &&
                    <MaterialUI.Typography variant="body2">
                        <b>{Strings.documents_details_attachments_unknown_type_title}</b>
                    </MaterialUI.Typography>
                }
               
                { showByType && props.show_list &&
                    <MaterialUI.TableContainer sx={{ maxHeight: 250 }}>
                            <MaterialUI.Table
                                stickyHeader
                                aria-label="sticky table"
                                size="small">
                                
                                <TableHeader columns={[
                                    {title:Strings.documents_details_attachment_id_title},
                                    {title:Strings.documents_details_attachment_amount_title}]}/>
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