import { Component } from "react";
import * as MaterialUI from "@mui/material";
import FeatureContainer from "../../../_commons/views/FeatureContainer";
import Strings from "../../../_Resources/strings/strings";
import CustomTextField from "../../../_commons/views/CustomTextField";
import CustomButtonForm from "../../../_commons/views/CustomButtonForm";
import OperationCompletedDialog from "../../../_commons/views/OperationCompletedDialog";
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
            user:{id:userId ,email:'', name:'', lastName:'', status:0, permissions:[]},
            permission_list:[],
            selected_permissions:[]
        };
        this.viewModel = props.viewModel;
        this.desactivateUserViewModel = props.desactivateUserViewModel;
        this.showLoading = this.showLoading.bind(this);
        this.onError = this.onError.bind(this);
        this.showPermissionsList = this.showPermissionsList.bind(this);
        this.onHandleSelectPermission = this.onHandleSelectPermission.bind(this);
        this.handledOnSummit = this.handledOnSummit.bind(this);
        this.handledOnDesactivateUser = this.handledOnDesactivateUser.bind(this);
        this.onDesativateUserFail = this.onDesativateUserFail.bind(this);
        this.handledEmailInput = this.handledEmailInput.bind(this);
        this.handledNameInput = this.handledNameInput.bind(this);
        this.handledLastNameInput = this.handledLastNameInput.bind(this);
    }

    handledOnSummit(event) {
        event.preventDefault();
    }

    handledRestoreUserView(event) {
        event.preventDefault();
    }

    handledOnDesactivateUser() {
        const user=this.state.user;
        user.status = user.status ^ 1;
        this.setState({user}, () => {
            this.desactivateUserViewModel.desactivateUser(user.id);
        });
    }

    onDesativateUserFail() {
        const user=this.state.user;
        user.status = user.status ^ 1;
        this.setState({user});
    }

    handledEmailInput(email) {
        const user=this.state.user;
        user.email = email;
        this.setState({user});
    }

    handledNameInput(name) {
        const user=this.state.user;
        user.name = name;
        this.setState({user});
    }

    handledLastNameInput(lastName) {
        const user=this.state.user;
        user.lastName = lastName;
        this.setState({user});
    }

    onHandleSelectPermission(event) {
        const value = event.target.value;
        this.setState({selected_permissions:value});
    }

    showLoading(value) {
        this.setState ({loading : value});
    }

    onError(error) {
        console.error("ah que chimbo!");
        console.error(error);
    }

    showPermissionsList(permissions) {
        this.setState({permission_list:permissions});
    }

    showUserPermissions(permissiosn) {

    }

    componentDidMount() {
        this.viewModel.subscribeOnLoading(this.showLoading);
        this.viewModel.subscribeOnShowError(this.onError);
        this.viewModel.subscribeOnRequestPermissionsList(this.showPermissionsList);
        
        this.desactivateUserViewModel.subscribeOnError(this.onDesativateUserFail);

        this.viewModel.requestUserDetails(this.state.user.id);
    }

    componentWillUnmount() {
        this.viewModel.unsubscribeOnLoading(this.showLoading);
        this.viewModel.unsubscribeOnShowError(this.onError);
        this.viewModel.unsubscribeOnRequestPermissionsList(this.showPermissionsList);
        this.desactivateUserViewModel.unsubscribeOnError(this.onDesativateUserFail);
    }

    renderSelectedPermissions(selectedValues) {
        
        return(<>
            <MaterialUI.Box
                sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                
                {selectedValues.sort((a,b) => a.IDCASA - b.IDCASA).map((item) => (
                    <MaterialUI.Chip
                        key={item.id}
                        label={`${item.CASA} - ${Strings.permissions_names_by_id[item.IDPERMISO]}`}/>
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
                                        checked={this.state.user.status !== 0}
                                        onChange={this.handledOnDesactivateUser} />
                                    <MaterialUI.Typography variant="body1">{Strings.text_activate_singular}</MaterialUI.Typography>
                                </MaterialUI.Stack>
                                <MaterialUI.Grid 
                                    container 
                                    spacing={{ xs: 1, md: 1}} 
                                    sx={{ pt: 1 }}>
                                    
                                    <CustomTextField 
                                        columnsInGrid={4}
                                        required={true}
                                        onChangeText={this.handledEmailInput}
                                        type="email"
                                        textValue={this.state.user.email}
                                        label={Strings.text_email}/>

                                    <CustomTextField 
                                        columnsInGrid={4}
                                        required={true}
                                        onChangeText={this.handledNameInput}
                                        type="text"
                                        textValue={this.state.user.name}
                                        label={Strings.text_name}/>
                                    
                                    <CustomTextField 
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
                                    required={true}
                                    labelId={`label-select-permissions`}
                                    label={Strings.text_permissions}
                                    multiple={true}
                                    onChange={this.onHandleSelectPermission}
                                    renderValue={this.renderSelectedPermissions}
                                    value={this.state.selected_permissions}>

                                    {this.state.permission_list.length > 0 &&
                                        this.state.permission_list.map(item => {
                                                return(
                                                    <MaterialUI.MenuItem key={item.id} value={item}>
                                                        {`${item.CASA} - ${Strings.permissions_names_by_id[item.IDPERMISO]}`}
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
                
                <OperationCompletedDialog 
                    open={this.state.updateUser}
                    onClose={this.closeOperationSuccessfulDialog}/>

            </FeatureContainer>
        </>);
    }
}