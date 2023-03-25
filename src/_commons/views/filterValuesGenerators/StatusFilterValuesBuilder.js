import Strings from "../../../_Resources/strings/strings";


export default function statusFilterValuesBuilder() {
    
    const all = {id:null, name:Strings.text_all};
    const entries = 
        Object.keys(Strings.text_status_by_id)
            .map(key => {return ({id:key, name:Strings.text_status_by_id[key]})});

    
    return [all,...entries];
}