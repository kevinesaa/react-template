import { Component } from "react";
import * as MaterialUI from "@mui/material";
import FeatureContainer from "../../../_commons/views/FeatureContainer";
import Strings from "../../../_Resources/strings/strings";
import CustomTextField from "../../../_commons/views/CustomTextField";
import CustomButtonForm from "../../../_commons/views/CustomButtonForm";


export default class AddNewUserView extends Component 
{
    constructor(props) {
        super(props);
        this.state = {loading:false,permission_list:[],selected_permissions:[], email:'', name:'', lastName:''};
        this.viewModel = props.viewModel;
        this.showLoading = this.showLoading.bind(this);
        this.onError = this.onError.bind(this);
        this.showPermissionsList = this.showPermissionsList.bind(this);
        this.onHandleSelectPermission = this.onHandleSelectPermission.bind(this);
        this.renderSelectedPermissions = this.renderSelectedPermissions.bind(this);
        this.handledEmailInput = this.handledEmailInput.bind(this);
        this.handledNameInput = this.handledNameInput.bind(this);
        this.handledLastNameInput= this.handledLastNameInput.bind(this);
    }

    handledOnSummit(event) {
        event.preventDefault();
    }

    handledEmailInput(email) {
        this.setState({email})
    }

    handledNameInput(name) {
        this.setState({name})
    }

    handledLastNameInput(lastName) {
        this.setState({lastName})
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

    componentDidMount() {
        this.viewModel.subscribeOnLoading(this.showLoading);
        this.viewModel.subscribeOnShowError(this.onError);
        this.viewModel.subscribeOnRequestPermissionsList(this.showPermissionsList);
        
        this.viewModel.requestPermissionsList();
    }

    componentWillUnmount() {
        this.viewModel.unsubscribeOnLoading(this.showLoading);
        this.viewModel.unsubscribeOnShowError(this.onError);
        this.viewModel.unsubscribeOnRequestPermissionsList(this.showPermissionsList);
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
        return (<> 
            <FeatureContainer 
                title_text={"Nuevo Usuario"}
                loading={this.state.loading}>
                
                
                <form onSubmit={this.handledOnSummit}>

                    <MaterialUI.Grid item xs={12} sm={12} md={12} lg={12}>
                        
                        <MaterialUI.Box sx={{ flexGrow: 1, m: 2 }}>    

                            <MaterialUI.Box sx={{ flexGrow: 1, mt: 3 }}>

                                <MaterialUI.Grid 
                                    container 
                                    spacing={{ xs: 1, md: 1}} 
                                    sx={{ pt: 1 }}>
                                    
                                    <CustomTextField 
                                        columnsInGrid={4}
                                        required={true}
                                        onChangeText={this.handledEmailInput}
                                        type="email"
                                        textValue={this.state.email}
                                        label={Strings.text_email}/>

                                    <CustomTextField 
                                        columnsInGrid={4}
                                        required={true}
                                        onChangeText={this.handledNameInput}
                                        type="text"
                                        textValue={this.state.name}
                                        label={Strings.text_name}/>
                                    
                                    <CustomTextField 
                                        columnsInGrid={4}
                                        required={true}
                                        onChangeText={this.handledLastNameInput}
                                        type="text"
                                        textValue={this.state.lastName}
                                        label={Strings.text_last_name}/>

                                </MaterialUI.Grid>
                                
                            </MaterialUI.Box>
                            
                            <MaterialUI.Grid align="center" item sx={{ mt: 4 }}>
                                <MaterialUI.Typography variant="subtitles">
                                    <b>{"Permisos por compañia"}</b>
                                </MaterialUI.Typography>
                            </MaterialUI.Grid>
                            <MaterialUI.Divider />

                            <MaterialUI.FormControl fullWidth>
                                <MaterialUI.InputLabel id={`label-select-permissions`}>
                                    {"Permisos"}
                                </MaterialUI.InputLabel>
                                <MaterialUI.Select 
                                    required={true}
                                    labelId={`label-select-permissions`}
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
                                            text={Strings.text_send}/>
                                        
                                        {/*Button cancel*/}
                                        <MaterialUI.Grid item>
                                            <MaterialUI.Paper elevation={0} align="center">
                                                <MaterialUI.Button 
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

                                                            {"Cancelar"}
                                                </MaterialUI.Button>
                                            </MaterialUI.Paper> 
                                        </MaterialUI.Grid>

                                    </MaterialUI.Grid>
                                </MaterialUI.Stack>
                            </MaterialUI.Box>

                        </MaterialUI.Box>
                    </MaterialUI.Grid>
                    
                </form>
            </FeatureContainer>
        </>);
    }
}

