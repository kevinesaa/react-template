import Strings from "../../../_Resources/strings/strings";
import Constants from "../../Constants";


export default function documentStatusFilterValuesBuilder() {
    
    const status = [
        {id:null, name:Strings.text_all},
        {id:Constants.DOC_TYPE_ANEXO_ID, name:Strings.text_cash_document},
        {id:Constants.DOC_TYPE_RECIBO_ID, name:Strings.text_electronic_document},
    ];
    

    
    return status;
}