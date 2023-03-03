import axios from 'axios';
import CompanyAndPermissionsRepository from '../../../sessionManager/repository/CompanyAndPermissionsRepository';
import SessionRepository from '../../../sessionManager/repository/SessionRepository';
import API_END_POINTS from '../../../_commons/Api';
import ErrorCodes from '../../../_commons/InternalErrorCodes';
import Permissions from '../../../_commons/Permissions';
import delay from '../../../_commons/util/Delay';
import ListListener from "../../../_commons/util/ListListenerContainer";


export default class UserListViewModel {

    #listenerOnLoading;
    #listenerShowError;
    #listenerOnPermissionsList;
    #listenerOnPageInfoData;
    #listenerOnLoadUsersList;

    constructor() {
        this.#listenerOnLoading = new ListListener();
        this.#listenerShowError = new ListListener();
        this.#listenerOnPermissionsList = new ListListener();
        this.#listenerOnPageInfoData = new ListListener();
        this.#listenerOnLoadUsersList = new ListListener();
    }

    unsubscribeOnLoading(func) {
        this.#listenerOnLoading.unsubscribe(func);
    }

    subscribeOnLoading(func) {
        this.#listenerOnLoading.subscribe(func);
    }

    unsubscribeOnShowError(func) {
        this.#listenerShowError.unsubscribe(func);
    }

    subscribeOnShowError(func) {
        this.#listenerShowError.subscribe(func);
    }
    
    unsubscribeOnRequestPermissionsList(func) {
        this.#listenerOnPermissionsList.unsubscribe(func);
    }

    subscribeOnRequestPermissionsList(func) {
        this.#listenerOnPermissionsList.subscribe(func);
    }

    unsubscribeOnPageInfoData(func) {
        this.#listenerOnPageInfoData.unsubscribe(func);
    }

    subscribeOnPageInfoData(func) {
        this.#listenerOnPageInfoData.subscribe(func);
    }

    unsubscribeOnLoadUsersList(func) {
        this.#listenerOnLoadUsersList.unsubscribe(func);
    }

    subscribeOnLoadUsersList(func) {
        this.#listenerOnLoadUsersList.subscribe(func);
    }
    
    async requestPermissionsList() {
        
        this.#onLoading(true);
        const creteUsers = CompanyAndPermissionsRepository.getCompaniesByPermissons([Permissions.ID_ALL_PERMISSIONS,Permissions.ID_CREATE_USERS]);
        const seeUsers = CompanyAndPermissionsRepository.getCompaniesByPermissons([Permissions.ID_ALL_PERMISSIONS,Permissions.ID_SEE_USERS]);
        const editUsers = CompanyAndPermissionsRepository.getCompaniesByPermissons([Permissions.ID_ALL_PERMISSIONS,Permissions.ID_UPDATE_USERS]);
        const deleteUsers = CompanyAndPermissionsRepository.getCompaniesByPermissons([Permissions.ID_ALL_PERMISSIONS,Permissions.ID_DISABLE_USERS]);
        this.#onLoading(false);
        this.#notifyPermissionsList({creteUsers, seeUsers,editUsers,deleteUsers });
    }

    async requestUserList(company, params) {
        
        if(company != null && company.id != null) {
                
            const token = SessionRepository.getSessionToken();
            this.#onLoading(true);
            
            const response =  await this.#makeRequestUsers({
                token,
                companyId:company.id, 
                page:params.page,
                orderByColumn:params.orderBy.column,
                orderByType:params.orderBy.order,
                search:params.search,
                activeUsers:params.activateFilter
            });
            
            this.#onLoading(false);
            
            if (response.status != 200) {

                this.#onError({errorCode:ErrorCodes.SOURCE_ERROR,
                    sourceErrorCode:response?.data?.app_status,
                    sourceErrorMessage:response?.data?.message
                });
            }
            else {
                
                const responseData = response?.data?.data ? response?.data?.data : {};
                const users =  responseData.user ? responseData.user:[];
                const pagination = responseData.pagination ? responseData.pagination: {currentPage:1, totalItems: users.length}
                this.#onPageInfoData(pagination);
                this.#onUserListLoad(users);
            }
        }
    }

    #onLoading(value) {
        this.#listenerOnLoading.execute(value);
    }
    
    #onError(error) {
        this.#listenerShowError.execute(error);
    }

    #notifyPermissionsList(permissions) {
        this.#listenerOnPermissionsList.execute(permissions);
    }

    #onPageInfoData(pagination) {
        this.#listenerOnPageInfoData.execute(pagination);
    }

    #onUserListLoad(users) {
        this.#listenerOnLoadUsersList.execute(users);
    }

    async #makeRequestUsers(requestModel) {
        
        const company = `company=${requestModel.companyId}`;
        const page = `page=${requestModel.page}`;
        let url = `${API_END_POINTS.GET_USERS_LIST}?${company}&${page}`;
        if(requestModel.orderByColumn) {
            const orderBy =`orderBy=${requestModel.orderByColumn}`;
            let orderType =`order=ASC`;
            if(requestModel.orderByType) {
                orderType =`order=${requestModel.orderByType}`;
            }
            url = `${url}&${orderBy}&${orderType}`;
        }
        
        if(requestModel.search) {
            const filters = `filters=[nombre,apellido,correo]`;
            const search = `search=${requestModel.search}`;
            url = `${url}&${filters}&${search}`;
        }
        
        if(requestModel.activeUsers != null) {
            const activateUsers = `active=${requestModel.activeUsers}`;
            url = `${url}&${activateUsers}`;
        }

        try{

            const response = await axios.get(url, { 
                headers:{
                    "Authorization": `Bearer ${requestModel.token}`,
                    "Content-Type": "application/json"
                }
            });
            
            return response;
        }
        catch(error) {
            console.error(error);
            return error.response;
        }

    }
}