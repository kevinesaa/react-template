import { Component } from "react";
import { Navigate } from "react-router-dom";
import * as MaterialUI from "@mui/material";
import DataTable from 'react-data-table-component';

import Dropdown from "../../../_commons/views/Dropdown";
import FeatureContainer from "../../../_commons/views/FeatureContainer";
import Strings from "../../../_Resources/strings/strings";
import Constants from "../../../_commons/Constants";
import ROUTES from "../../../_commons/Routes";


const FIRST_PAGE = 1;

const DOCUMENT_PER_PAGE = Constants.REGISTER_PER_PAGE;

const COLUMNS_IDS = Object.freeze({
    user_name:{table_id:'user_name',request_id:'nombre'},
    user_last_name:{table_id:'user_last_name',request_id:'apellido'},
    user_email:{table_id:'user_email',request_id:'correo'},
});

const SELECT_ACTIVES = Object.freeze({
    all:{text:'Todos',value:null},
    activates:{text:'Activos',value:true},
    inactivate:{text:'Inactivos',value:false}
});

export default class UserListView extends Component 
{
    
    constructor(props) {
        super(props);
        this.state = {
                loading:false,
                firstRequest:false, 
                companies:[], 
                currentCompany:'',
                itemsPerPage:DOCUMENT_PER_PAGE,
                currentPage:1, 
                totalItems:0,
                orderBy:{column:COLUMNS_IDS.user_name.request_id,order:'ASC'},
                search:'',
                searchActive:SELECT_ACTIVES.all,
                users:[],
                showCreateNewButton:false,
                goToCreateNew:false,
                goToUserDetails:false,
                userToSeeId:-1
            };
        this.viewModel = props.viewModel;
        this.onError = this.onError.bind(this);
        this.onLoadingChangeHandled = this.onLoadingChangeHandled.bind(this);
        this.handledOnSelectCompany = this.handledOnSelectCompany.bind(this);
        this.onPermissonsListener = this.onPermissonsListener.bind(this);
        this.createNewUser = this.createNewUser.bind(this);
        this.seeUserDetails = this.seeUserDetails.bind(this);
        this.setCompanies = this.setCompanies.bind(this);
        this.showUserList = this.showUserList.bind(this);
        this.showPageInfo = this.showPageInfo.bind(this);
        this.handleOnChangePage = this.handleOnChangePage.bind(this);
        this.handledOnSortUsers = this.handledOnSortUsers.bind(this);
        this.handleOnSearch = this.handleOnSearch.bind(this);
        this.handledOnSerchStatus = this.handledOnSerchStatus.bind(this);
        this.onItemClick = this.onItemClick.bind(this);
        this.columns = [
            { 
                id:COLUMNS_IDS.user_name.table_id, 
                name:Strings.text_name,
                sortable: true,
                selector:row=>row.NOMBRE,
                
            },
            {
                id:COLUMNS_IDS.user_last_name.table_id, 
                name:Strings.text_last_name,
                sortable: true,
                selector:row=>row.APELLIDO,
            },    
            {
                id:COLUMNS_IDS.user_email.table_id, 
                name:Strings.text_email,
                sortable: true,
                selector:row=>row.CORREO,
            },
        ];
    }

    onPermissonsListener(permissions) {
        
        this.setState({
            showCreateNewButton:permissions.creteUsers.length
        });
        this.setCompanies(permissions.seeUsers);
    }
    
    setCompanies(companies) {

        this.setState({companies:companies.map(it => {return {id:it.id,text:it.name}})});
    }

    createNewUser() {
        this.setState({goToCreateNew:true})
    }

    onItemClick(row, _) {
        this.seeUserDetails(row);
    }

    seeUserDetails(user) {
        
        this.setState({
            goToUserDetails:true,
            userToSeeId:user.IDUSUARIO
        });
    }

    showPageInfo(pageInfo) {
        
        this.setState({
            itemsPerPage:pageInfo.limit,
            totalItems:pageInfo.totalItems,
            currentPage:pageInfo.currentPage
        });
    }

    showUserList(users) {
        
        this.setState({firstRequest:true,users});
    }

    handleOnChangePage( _ , page) {
        
        const orderBy = this.state.orderBy;
        const search = this.state.search;
        const company = this.state.currentCompany;
        const activateFilter = this.state.searchActive.value;
        this.setState ({currentPage:page});
        this.viewModel.requestUserList(company,{page,search,activateFilter,orderBy});
    }

    handleOnSearch(event) {
        const search = event.target.value;
        this.setState ({search}, () => {
            this.handleOnChangePage('',FIRST_PAGE); 
        });
    }

    handledOnSelectCompany(company) {
        
        this.setState ({currentCompany : company}, () => {
            this.handleOnChangePage('',FIRST_PAGE); 
        });
    }

    handledOnSortUsers(selectedColumn,order,_) {
        
        const column = COLUMNS_IDS[selectedColumn.id].request_id;
        const orderBy = {column,order};
        this.setState ({orderBy}, () => {
            this.handleOnChangePage('',FIRST_PAGE); 
        });
    }

    handledOnSerchStatus(event) {
        
        const searchActive = event.target.value;
        this.setState ({searchActive}, () => {
            this.handleOnChangePage('',FIRST_PAGE); 
        });
    }

    onLoadingChangeHandled(value) {
        
        this.setState({loading:value});
    }

    onError(error) {
        console.error("ah que chimbo!");
        console.error(error);
    }

    componentDidMount() {
        this.viewModel.subscribeOnLoading(this.onLoadingChangeHandled);
        this.viewModel.subscribeOnShowError(this.onError);
        this.viewModel.subscribeOnRequestPermissionsList(this.onPermissonsListener);
        this.viewModel.subscribeOnLoadUsersList(this.showUserList);
        this.viewModel.subscribeOnPageInfoData(this.showPageInfo);
        
        this.viewModel.requestPermissionsList();
    }

    componentWillUnmount() {
        this.viewModel.unsubscribeOnLoading(this.onLoadingChangeHandled);
        this.viewModel.unsubscribeOnShowError(this.onError);
        this.viewModel.unsubscribeOnRequestPermissionsList(this.onPermissonsListener);
        this.viewModel.unsubscribeOnLoadUsersList(this.showUserList);
        this.viewModel.unsubscribeOnPageInfoData(this.showPageInfo);
    }

    render() {        

        if(this.state.goToUserDetails) {
            const userId = this.state.userToSeeId;
            if(userId > 0) 
            {
                return (<Navigate to={ROUTES.USER_DETAILS.replace(':id',userId)}/>);
            }
        }

        if(this.state.goToCreateNew) {
            
            return (<Navigate to={ROUTES.USER_NEW}/>);
        }

        return (
            <>
                <FeatureContainer 
                    title_text={Strings.user_list_title}>

                    {/* filters */}
                    <MaterialUI.Box sx={{ p: 2 }}>
                        
                        <MaterialUI.Stack direction={{ xs: "column", sm: "row" }}>
                            
                            <MaterialUI.Grid
                                container
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center">
                                
                                <Dropdown 
                                    id="drop-company" 
                                    label={Strings.text_companies}
                                    onSelectItem={this.handledOnSelectCompany}
                                    value={this.state.currentCompany}
                                    items={this.state.companies} />
                                
                                <MaterialUI.Grid item xs={6}>
                                    <MaterialUI.Stack
                                        sx={{ m: 2 }}
                                        justifyContent="flex-end"
                                        alignItems="flex-start"
                                        direction={{ xs: "column", sm: "row" }}>

                                        {this.state.showCreateNewButton &&
                                            <MaterialUI.Button
                                                sx={{
                                                    px: 5,
                                                    borderRadius: "1rem",
                                                    color: "white.main",
                                                    textTransform: "none",
                                                }}
                                                onClick={this.createNewUser}
                                                variant="contained">
                                                    {Strings.user_list_button_new}
                                            </MaterialUI.Button>
                                        }
                                    </MaterialUI.Stack>
                                </MaterialUI.Grid>
                            </MaterialUI.Grid>
                        </MaterialUI.Stack>
                    </MaterialUI.Box>
                    
                    {/**Search fields*/}
                    <MaterialUI.Box sx={{ ml: 3 }}>
                        
                        <MaterialUI.Stack direction={{ xs: "column", sm: "row" }}>
                            
                            <MaterialUI.TextField
                                sx={{marginRight:3}}
                                label={Strings.text_search}
                                value={this.state.search}
                                onChange={this.handleOnSearch} 
                                size="small"
                                noValidate
                                autoComplete="off"/>

                            <MaterialUI.FormControl>
                                <MaterialUI.InputLabel id={`label-drop-status`}>
                                    {Strings.text_status}
                                </MaterialUI.InputLabel>
                                <MaterialUI.Select
                                    id="drop-status"
                                    labelId={`label-drop-status`}
                                    sx={{minWidth: 100}}
                                    size="small"
                                    label={Strings.text_status}
                                    onChange={this.handledOnSerchStatus}
                                    defaultValue={SELECT_ACTIVES.all}
                                    autoWidth={true}>
                                { 
                                    Object.values(SELECT_ACTIVES).map((item,index) => {
                                        return (
                                            <MaterialUI.MenuItem 
                                                key={`select-status-${index}`} 
                                                value={item}>
                                                        {item.text}
                                            </MaterialUI.MenuItem>)
                                    })    
                                }
                                </MaterialUI.Select>
                            </MaterialUI.FormControl>
                            

                        </MaterialUI.Stack>
                    </MaterialUI.Box>

                    {/** tabla */}
                    <MaterialUI.Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                        <MaterialUI.Box gridColumn="span 12">
                           
                            <DataTable 
                                columns={this.columns}
                                data={this.state.users}
                                progressPending={this.state.loading}
                                progressComponent={<MaterialUI.CircularProgress/> }
                                persistTableHead
                                noDataComponent={!this.state.firstRequest? "":(this.state.users.length > 0 ? this.state.users:Strings.text_not_data) }
                                striped
                                highlightOnHover
                                pointerOnHover
                                pagination
                                paginationPerPage={this.state.itemsPerPage}
                                paginationServer 
                                paginationTotalRows={this.state.totalItems}
                                paginationComponentOptions={{
                                    selectAllRowsItem:false,
                                    noRowsPerPage:true
                                }}
                                sortServer
                                defaultSortFieldId={COLUMNS_IDS.user_name.table_id}
                                onSort={this.handledOnSortUsers}
                                onChangePage={(page,totalRows) => this.handleOnChangePage(totalRows,page)}
                                onRowClicked={this.onItemClick} />
                            
                        </MaterialUI.Box>
                    </MaterialUI.Box>

                </FeatureContainer>
            </>
        );
    }
}