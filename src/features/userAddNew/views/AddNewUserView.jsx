import { Component } from "react";
import * as MaterialUI from "@mui/material";
import FeatureContainer from "../../../_commons/views/FeatureContainer";
import Strings from "../../../_Resources/strings/strings";


export default class AddNewUserView extends Component 
{
    constructor(props) {
        super(props);
        this.state = {loading:false,permission_list:[],selected_permissions:[]}
        this.viewModel = props.viewModel;
        this.showLoading = this.showLoading.bind(this);
        this.onError = this.onError.bind(this);
        this.showPermissionsList = this.showPermissionsList.bind(this);
        this.onHandleSelectPermission = this.onHandleSelectPermission.bind(this);
        
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

    render() {
        return (<> 
            <FeatureContainer 
                title_text={"Nuevo Usuario"}
                loading={this.state.loading}>
                
                <MaterialUI.Select 
                    multiple={true}
                    onChange={this.onHandleSelectPermission}
                    value={this.state.selected_permissions}>

                    {this.state.permission_list.length > 0 &&
                        this.state.permission_list.map(item => {
                                return(
                                    <MaterialUI.MenuItem key={item.id} value={item}>
                                        {`${item.CASA} -  ${Strings.permissions_names_by_id[item.IDPERMISO]}`}
                                    </MaterialUI.MenuItem>
                                )}
                            )
                        
                    }
                </MaterialUI.Select>


            </FeatureContainer>
        </>);
    }
}