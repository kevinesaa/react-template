import { Component } from "react";
import * as MaterialUI from "@mui/material";
import FeatureContainer from "../../../_commons/views/FeatureContainer";
import Strings from "../../../_Resources/strings/strings";
import CustomTextField from "../../../_commons/views/CustomTextField";
import CustomButtonForm from "../../../_commons/views/CustomButtonForm";
import CustomMessageDialog from "../../../_commons/views/CustomMessageDialog";
import { Navigate } from "react-router-dom";
import ROUTES from "../../../_commons/Routes";

export default class UserDetailsView extends Component 
{
    
    constructor(props) {
        super(props);
        
        const userId = window.location.pathname.replace(/[^0-9]/g, '');
        
        this.state = {
            loading:false,
            navigateToUsers:false,
            updateUser:false,
            user:{id:userId ,email:'', name:'', lastName:'', status:0},
            permission_list:[],
            selected_permissions:[],
            canDeleteUser:false,
            canEditUser:false,
            canSeeUser:true
        };
        this.viewModel = props.viewModel;
        this.desactivateUserViewModel = props.desactivateUserViewModel;
        this.showLoading = this.showLoading.bind(this);
        this.onError = this.onError.bind(this);
        this.onSessionPermissions = this.onSessionPermissions.bind(this);
        this.showSelectablePermissionsList = this.showSelectablePermissionsList.bind(this);
        this.showUserPermissions = this.showUserPermissions.bind(this);
        this.onHandleSelectPermission = this.onHandleSelectPermission.bind(this);
        this.handledOnSummit = this.handledOnSummit.bind(this);
        this.handledRestoreUserView = this.handledRestoreUserView.bind(this);
        this.handledOnDesactivateUser = this.handledOnDesactivateUser.bind(this);
        this.onDesativateUserFail = this.onDesativateUserFail.bind(this);
        this.handledEmailInput = this.handledEmailInput.bind(this);
        this.handledNameInput = this.handledNameInput.bind(this);
        this.handledLastNameInput = this.handledLastNameInput.bind(this);
        this.showUserInfo = this.showUserInfo.bind(this);
        this.handledNavigateToUserList = this.handledNavigateToUserList.bind(this);
        this.handledDialogOnUpdateUserCompletedSuccessful = this.handledDialogOnUpdateUserCompletedSuccessful.bind(this);
        this.onDesativateUserCompletedSuccessful = this.onDesativateUserCompletedSuccessful.bind(this);
        this.onUpdateUserSuccessful = this.onUpdateUserSuccessful.bind(this);
        this.permissionToSelectHelper = this.permissionToSelectHelper.bind(this);
    }

    handledNavigateToUserList() {
        this.setState({navigateToUsers:true});
    }

    handledDialogOnUpdateUserCompletedSuccessful() {
        this.setState({
            updateUser:false
        },() => {
            this.handledNavigateToUserList();
        });
    }

    handledOnSummit(event) {
        
        event.preventDefault();
        
        const user = this.state.user;
        this.viewModel.updateUser({
            id:user.id,
            email:user.email,
            name:user.name,
            lastName:user.lastName,
            permissions:this.state.selected_permissions
        });
    }

    handledRestoreUserView(event) {
        event.preventDefault();
        this.handledNavigateToUserList();
    }

    handledOnDesactivateUser() {
        const user = this.state.user;
        user.status = user.status ^ 1;
        this.setState({user}, () => {
            
            this.desactivateUserViewModel.desactivateUser(user.id);
        });
    }

    onDesativateUserCompletedSuccessful(userInfo) {
        
        const user = this.state.user;
        user.status = userInfo.user.active;
        this.setState({user});
    }

    onDesativateUserFail(error) {
        console.log('ah que chimbo');
        console.log(error);
        const user = this.state.user;
        user.status = user.status ^ 1;
        this.setState({user});
    }

    handledEmailInput(email) {
        const user = this.state.user;
        user.email = email;
        this.setState({user});
    }

    handledNameInput(name) {
        const user = this.state.user;
        user.name = name;
        this.setState({user});
    }

    handledLastNameInput(lastName) {
        const user = this.state.user;
        user.lastName = lastName;
        this.setState({user});
    }

    onHandleSelectPermission(event) {
        const value = event.target.value;
        this.setState({selected_permissions:value});
    }

    showLoading(value) {
        this.setState({loading : value});
    }

    onError(error) {
        console.error("ah que chimbo!");
        console.error(error);
    }

    onSessionPermissions(permissions) {
        
        this.setState({
            canDeleteUser:permissions.deleteUsers,
            canEditUser:permissions.editUsers,
            canSeeUser:permissions.seeUsers 
        });
    }

    onUpdateUserSuccessful() {
        this.setState({
            updateUser:true
        });
    }

    showUserInfo(userInfo) {
        this.setState({user:userInfo});
    }

    showSelectablePermissionsList(permissions) {
        this.setState({permission_list:permissions});
    }

    showUserPermissions(permissions) {
        
        this.setState({selected_permissions:permissions});
    }

    permissionToSelectHelper() {
        //sorry, maybe the materialUI.select componet has a bug
        const p = this.state.permission_list.filter(per => this.state.selected_permissions.map(i => i.id).includes(per.id));
        const mis = this.state.selected_permissions.filter(per => !p.map(i => i.id).includes(per.id));
        mis.push(...p)
        return mis;
    }

    componentDidMount() {
        
        this.viewModel.subscribeOnLoading(this.showLoading);
        this.viewModel.subscribeOnSessionPermissions(this.onSessionPermissions);

        this.viewModel.subscribeOnShowError(this.onError);
        this.viewModel.subscribeOnShowUser(this.showUserInfo);
        this.viewModel.subscribeOnShowUserPermissions(this.showUserPermissions);
        this.viewModel.subscribeOnRequestSelectablePermissionsList(this.showSelectablePermissionsList);
        this.viewModel.subscribeOnUpdateUserComplete(this.onUpdateUserSuccessful);
        
        this.desactivateUserViewModel.subscribeOnOperationCompletedSuccessful(this.onDesativateUserCompletedSuccessful);
        this.desactivateUserViewModel.subscribeOnError(this.onDesativateUserFail);

        this.viewModel.requestUserDetails(this.state.user.id);
    }

    componentWillUnmount() {
        
        this.viewModel.unsubscribeOnLoading(this.showLoading);
        this.viewModel.unsubscribeOnSessionPermissions(this.onSessionPermissions);

        this.viewModel.unsubscribeOnShowError(this.onError);
        this.viewModel.unsubscribeOnShowUser(this.showUserInfo);
        this.viewModel.unsubscribeOnShowUserPermissions(this.showUserPermissions);
        this.viewModel.unsubscribeOnRequestSelectablePermissionsList(this.showSelectablePermissionsList);
        this.viewModel.unsubscribeOnUpdateUserComplete(this.onUpdateUserSuccessful);
       
        this.desactivateUserViewModel.unsubscribeOnError(this.onDesativateUserFail);
        this.desactivateUserViewModel.unsubscribeOnOperationCompletedSuccessful(this.onDesativateUserCompletedSuccessful);
    }

    renderSelectedPermissions(selectedValues) {
        
        return(<>
            <MaterialUI.Box
                sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                
                {selectedValues.sort((a,b) => a.IDCASA - b.IDCASA).map((item) => (
                    <MaterialUI.Chip
                        key={item.id}
                        label={`${item.company} - ${Strings.permissions_names_by_id[item.id_permission]}`}/>
                ))}
            </MaterialUI.Box>
        </>);
    }

    render() {

        if(this.state.navigateToUsers) {
            return (<Navigate to={ROUTES.USERS}/>);
        }
        

        return (<> 
            <FeatureContainer 
                title_text={Strings.user_details_title}
                loading={this.state.loading}>
                
                
                <form onSubmit={this.handledOnSummit}>

                    <MaterialUI.Grid item xs={12} sm={12} md={12} lg={12}>
                        
                        <MaterialUI.Box sx={{ flexGrow: 1, m: 2 }}>    

                            
                            <MaterialUI.Box sx={{ flexGrow: 1, mt: 3 }}>
                            
                                <MaterialUI.Stack alignItems="center" direction={{ xs: "column", sm: "row" }}>
                                    <MaterialUI.Typography variant="body1">{Strings.text_inactivate_singular}</MaterialUI.Typography>
                                    <MaterialUI.Switch 
                                        disabled={!this.state.canDeleteUser}
                                        checked={this.state.user.status !== 0}
                                        onChange={this.handledOnDesactivateUser} />
                                    <MaterialUI.Typography variant="body1">{Strings.text_activate_singular}</MaterialUI.Typography>
                                </MaterialUI.Stack>
                                <MaterialUI.Grid 
                                    container 
                                    spacing={{ xs: 1, md: 1}} 
                                    sx={{ pt: 1 }}>
                                    
                                    <CustomTextField
                                        disabled={!this.state.canEditUser}
                                        columnsInGrid={4}
                                        required={true}
                                        onChangeText={this.handledEmailInput}
                                        type="email"
                                        textValue={this.state.user.email}
                                        label={Strings.text_email}/>

                                    <CustomTextField 
                                        disabled={!this.state.canEditUser}
                                        columnsInGrid={4}
                                        required={true}
                                        onChangeText={this.handledNameInput}
                                        type="text"
                                        textValue={this.state.user.name}
                                        label={Strings.text_name}/>
                                    
                                    <CustomTextField
                                        disabled={!this.state.canEditUser} 
                                        columnsInGrid={4}
                                        required={true}
                                        onChangeText={this.handledLastNameInput}
                                        type="text"
                                        textValue={this.state.user.lastName}
                                        label={Strings.text_last_name}/>

                                </MaterialUI.Grid>
                                
                            </MaterialUI.Box>
                            
                            <MaterialUI.Grid align="center" item sx={{ mt: 4 }}>
                                <MaterialUI.Typography variant="subtitles">
                                    <b>{Strings.user_details_permissions_by_company_title}</b>
                                </MaterialUI.Typography>
                            </MaterialUI.Grid>
                            <MaterialUI.Divider />

                            <MaterialUI.FormControl fullWidth>
                                <MaterialUI.InputLabel id={`label-select-permissions`}>
                                    {Strings.text_permissions}
                                </MaterialUI.InputLabel>
                                <MaterialUI.Select 
                                    inputProps={{ readOnly: !this.state.canEditUser }}
                                    required={true}
                                    labelId={`label-select-permissions`}
                                    label={Strings.text_permissions}
                                    multiple={true}
                                    onChange={this.onHandleSelectPermission}
                                    renderValue={this.renderSelectedPermissions}
                                    value={this.permissionToSelectHelper()}>

                                    {this.state.permission_list.length > 0 &&
                                        this.state.permission_list.map(item => {
                                                return(
                                                    <MaterialUI.MenuItem key={item.id} value={item}>
                                                        {`${item.company} - ${Strings.permissions_names_by_id[item.id_permission]}`}
                                                    </MaterialUI.MenuItem>
                                                )}
                                            )
                                        
                                    }
                                </MaterialUI.Select>
                            </MaterialUI.FormControl>

                            <MaterialUI.Box sx={{ p: 1 }}>
                                <MaterialUI.Stack direction={{ xs: "column", sm: "row" }}>
                                    
                                    <MaterialUI.Grid
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center">

                                        <CustomButtonForm 
                                            text={Strings.text_save}/>
                                        
                                        {/*Button cancel*/}
                                        <MaterialUI.Grid item>
                                            <MaterialUI.Paper elevation={0} align="center">
                                                <MaterialUI.Button
                                                    onClick={this.handledRestoreUserView} 
                                                    align="center"
                                                    variant="contained"
                                                    sx={{
                                                        px: 5,
                                                        mt: 1,
                                                        ml:2,
                                                        mb: 1,
                                                        borderRadius: "1rem",
                                                        color: "white.main",
                                                        textTransform: "none"}}>

                                                        {Strings.text_cancel}
                                                </MaterialUI.Button>
                                            </MaterialUI.Paper> 
                                        </MaterialUI.Grid>

                                    </MaterialUI.Grid>
                                </MaterialUI.Stack>
                            </MaterialUI.Box>

                        </MaterialUI.Box>
                    </MaterialUI.Grid>
                    
                </form>
                
                <CustomMessageDialog 
                    open={this.state.updateUser}
                    message={Strings.text_operation_successful}
                    onClose={this.handledDialogOnUpdateUserCompletedSuccessful}/>
                
                {!this.state.canSeeUser &&
                   <CustomMessageDialog 
                        open={!this.state.canSeeUser}
                        message={Strings.missing_permission_see_users}
                        onClose={this.handledNavigateToUserList}/>
                }
             </FeatureContainer>
        </>);
    }
}