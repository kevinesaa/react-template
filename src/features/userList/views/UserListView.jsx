import { Component } from "react";
import { Navigate } from "react-router-dom";
import * as MaterialUI from "@mui/material";
import DataTable from 'react-data-table-component';

import Dropdown from "../../../_commons/views/Dropdown";
import FeatureContainer from "../../../_commons/views/FeatureContainer";
import Strings from "../../../_Resources/strings/strings";
import Constants from "../../../_commons/Constants";
import ROUTES from "../../../_commons/Routes";


const DOCUMENT_PER_PAGE = Constants.REGISTER_PER_PAGE;

const COLUMNS_IDS = Object.freeze({
    user_name:{table_id:'user_name',request_id:'nombre'},
    user_last_name:{table_id:'user_last_name',request_id:'apellido'},
    user_email:{table_id:'user_email',request_id:'correo'},
});

export default class UserListView extends Component 
{
    
    constructor(props) {
        super(props);
        this.state = {
                loading:false, 
                companies:[], 
                currentCompany:'',
                currentPage:1, 
                totalItems:0,
                orderBy:{column:COLUMNS_IDS.user_name.request_id,order:'ASC'},
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
        this.handleOnSortUsers = this.handleOnSortUsers.bind(this);
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
            totalItems:pageInfo.totalItems,
            currentPage:pageInfo.currentPage
        });
    }

    showUserList(users) {
        
        this.setState({users});
    }

    onPermissonsListener(permissions) {
        
        this.setState({
            showCreateNewButton:permissions.creteUsers.length
        });
        this.setCompanies(permissions.seeUsers);
    }

    handledOnSelectCompany(company) {
        
        const page = 1;
        const orderBy = this.state.orderBy;
        this.setState ({currentCompany : company, currentPage:page});
        this.viewModel.requestUserList(company,{page,orderBy});
    }

    handleOnChangePage( _ , newPage) {
        
        this.setState ({currentPage:newPage});
        const orderBy = this.state.orderBy;
        this.viewModel.requestUserList(this.state.currentCompany,{page:newPage,orderBy});
    }

    handleOnSortUsers(selectedColumn,order,_) {
        
        const page = 1;
        const column = COLUMNS_IDS[selectedColumn.id].request_id;
        const orderBy = {column,order};
        this.setState ({orderBy,currentPage:page});
        this.viewModel.requestUserList(this.state.currentCompany,{page,orderBy});
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
                    title_text={Strings.user_list_title}
                    loading={this.state.loading}>

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
                                    defaultValue={this.state.currentCompany}
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
                    
                    {/** tabla */}
                    <MaterialUI.Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gap={2}>
                        <MaterialUI.Box gridColumn="span 12">
                           
                            <DataTable 
                                columns={this.columns}
                                data={this.state.users}
                                persistTableHead
                                noDataComponent={""}
                                striped
                                highlightOnHover
                                pointerOnHover
                                pagination
                                paginationPerPage={DOCUMENT_PER_PAGE}
                                paginationServer 
                                paginationTotalRows={this.state.totalItems}
                                paginationComponentOptions={{
                                    selectAllRowsItem:false,
                                    noRowsPerPage:true
                                }}
                                sortServer
                                defaultSortFieldId={COLUMNS_IDS.user_name.table_id}
                                onSort={this.handleOnSortUsers}
                                onChangePage={(page,totalRows) => this.handleOnChangePage(totalRows,page)}
                                onRowClicked={this.onItemClick} />
                            
                        </MaterialUI.Box>
                    </MaterialUI.Box>

                </FeatureContainer>
            </>
        );
    }
}