import axios from 'axios';
import ListListener from "../../../_commons/util/ListListenerContainer";
import SessionRepository from "../../../sessionManager/repository/SessionRepository";
import ErrorCodes from "../../../_commons/InternalErrorCodes";
import API_END_POINTS from '../../../_commons/Api';
import Permissions from '../../../_commons/Permissions';
import CompanyAndPermissionsRepository from '../../../sessionManager/repository/CompanyAndPermissionsRepository';


export default class DocumentMissingListViewModel
{
    #listenerOnLoadingDocuments;
    #listenerOnLoadingDocumentsOptions;
    
    constructor() {
        this.#listenerOnLoadingDocuments = new ListListener();
        this.#listenerOnLoadingDocumentsOptions = new ListListener();
        
    }

    unsubscribeOnLoadingDocuments(func) {
        this.#listenerOnLoadingDocuments.unsubscribe(func);
    }

    subscribeOnLoadingDocuments(func) {
        this.#listenerOnLoadingDocuments.subscribe(func);
    }

    unsubscribeOnLoadingDocumentsOptions(func) {
        this.#listenerOnLoadingDocumentsOptions.unsubscribe(func);
    }

    subscribeOnLoadingDocumentsOptions(func) {
        this.#listenerOnLoadingDocumentsOptions.subscribe(func);
    }
}