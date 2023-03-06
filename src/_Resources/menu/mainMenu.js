
import DocumentsListView from "../../features/documentList/views/DocumentsListView";
import UserListView from "../../features/userList/views/UserListView";
import DocumentsViewModel from "../../features/documentList/viewModels/DocumentsViewModel";
import DocumentDetailViewModel from "../../features/documentDetails/viewModels/DocumentDetailViewModel";
import AddNewUserView from "../../features/userAddNew/views/AddNewUserView";
import UserDetailsView from "../../features/userDetails/views/UserDetailsView";
import ROUTES from "../../_commons/Routes";
import Strings from "../strings/strings";
import UserProfileContainer from "../../features/profileContainer/views/UserProfileContainer"
import UserProfileViewModel from "../../features/profile/viewModels/UserProfileViewModel";
import ChangePasswordViewModel from "../../features/passwordChange/viewModels/ChangePasswordViewModel";
import Permissions from "../../_commons/Permissions";
import AddNewUserViewModel from "../../features/userAddNew/viewModels/AddNewUserViewModel";
import UserDetailsViewModel from "../../features/userDetails/viewModels/UserDetailsViewModel";
import UserListViewModel from "../../features/userList/viewModels/UserListViewModel";
import DesactivateUserViewModel from "../../features/usersDesactivate/viewModels/DesactivateUserViewModel";



export default Object.freeze([
    {
        path:ROUTES.DOCUMENTS, 
        isSideBarItem:true,
        isNeedPermission:true,
        permissions:[Permissions.ID_ALL_PERMISSIONS,Permissions.ID_SEE_DOCUMENTS_PERMISSION],
        page: <DocumentsListView detailViewModel={new DocumentDetailViewModel()} viewModel={new DocumentsViewModel()}/>, 
        title:Strings.side_bar_documents, 
        icon:""
    },
    {
        path:ROUTES.USERS,
        isSideBarItem:true,
        isNeedPermission:true,
        permissions:[Permissions.ID_ALL_PERMISSIONS, Permissions.ID_SEE_USERS ], 
        page: <UserListView viewModel={new UserListViewModel()} desactivateUserViewModel={new DesactivateUserViewModel()}/>, 
        title:Strings.side_bar_users, 
        icon:""
    },
    {
        path:ROUTES.USER_NEW,
        isSideBarItem:false,
        isNeedPermission:true,
        permissions:[Permissions.ID_ALL_PERMISSIONS, Permissions.ID_CREATE_USERS], 
        page: <AddNewUserView viewModel={new AddNewUserViewModel()}/>, 
        title:"Agregar usuario", 
        icon:""
    },
    {
        path:ROUTES.USER_DETAILS,
        isSideBarItem:false,
        isNeedPermission:true,
        permissions:[Permissions.ID_ALL_PERMISSIONS, Permissions.ID_SEE_USERS], 
        page: <UserDetailsView viewModel={new UserDetailsViewModel()}/>, 
        title:"Detalles del usuario", 
        icon:""
    },
    {
        path:ROUTES.PROFILE,
        isSideBarItem:true,
        isNeedPermission:false,
        permissions:[], 
        page: <UserProfileContainer userViewModel={new UserProfileViewModel()} changePassViewModel={new ChangePasswordViewModel()}/>, 
        title:Strings.side_bar_user_profile, 
        icon:""
    }
]);