import { Component } from "react";
import { Navigate } from "react-router-dom";
import * as MaterialUI from "@mui/material";
import Dropdown from "../../../_commons/views/Dropdown";
import FeatureContainer from "../../../_commons/views/FeatureContainer";
import Strings from "../../../_Resources/strings/strings";
import TableHeader from "../../../_commons/views/tableComponents/TableHeader";
import Constants from "../../../_commons/Constants";
import UsersAdapter from "./UsersAdapter";
import ROUTES from "../../../_commons/Routes";


const DOCUMENT_PER_PAGE = Constants.REGISTER_PER_PAGE;

export default class UserListView extends Component 
{
    constructor(props) {
        super(props);
        this.state = {
                loading:false, 
                companies:[], 
                currentCompany:'',
                currentPage:0, 
                totalItems:0,
                users:[],
                showCreateNewButton:false,
                goToCreateNew:false,
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
        this.columns = [
            {title:Strings.text_name},
            {title:Strings.text_last_name},    
            {title:Strings.text_email},
        ];
    }
    
    setCompanies(companies) {
        
        this.setState({companies:companies.map(it => {return {id:it.id,text:it.name}})});
    }

    createNewUser() {
        this.setState({goToCreateNew:true})
    }

    seeUserDetails(user) {
        console.log("on click");
        console.log(user);
    }

    showPageInfo(pageInfo) {
        
        this.setState({
            totalItems:pageInfo.totalItems,
            currentPage:pageInfo.currentPage-1
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
        
        this.setState ({currentCompany : company, currentPage:0});
        
        this.viewModel.requestUserList(company,{page:1});
    }

    handleOnChangePage( _ , newPage) {
        
        this.setState ({currentPage:newPage});
        this.viewModel.requestUserList(this.state.currentCompany,{page:newPage + 1});
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

    render(){

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
                            <MaterialUI.TableContainer sx={{ maxHeight: 440 }}>
                                <MaterialUI.Table
                                    sx={{ minWidth: 700 }}
                                    stickyHeader
                                    aria-label="sticky table"
                                    size="small">
                                    
                                    <TableHeader 
                                        columns={this.columns} />
                                    
                                    {this.state.users.length === 0?<></>:
                                        <MaterialUI.TableBody>
                                            <UsersAdapter 
                                                items={this.state.users}
                                                onItemClickListener={this.seeUserDetails}/>
                                        </MaterialUI.TableBody>
                                    }
                                </MaterialUI.Table>
                                
                            </MaterialUI.TableContainer>
                            
                            {this.state.users.length === 0?<></>:
                            <MaterialUI.TablePagination
                                    rowsPerPageOptions={[
                                        DOCUMENT_PER_PAGE,
                                        //{ value: -1, label: "Todos" },
                                    ]}
                                    component="div" 
                                    count={this.state.totalItems}
                                    rowsPerPage={DOCUMENT_PER_PAGE}
                                    page={this.state.currentPage}
                                    onPageChange={this.handleOnChangePage}
                                />
                            }
                        </MaterialUI.Box>
                    </MaterialUI.Box>

                </FeatureContainer>
            </>
        );
    }
}