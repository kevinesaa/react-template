
import DocumentsListView from "../../features/documentList/views/DocumentsListView";
import UserList from "../../features/userList/views/UserList";
import DocumentsViewModel from "../../features/documentList/viewModels/DocumentsViewModel";
import DocumentDetailViewModel from "../../features/documentDetails/viewModels/DocumentDetailViewModel";
import ROUTES from "../../_commons/Routes";
import Strings from "../strings/strings";
import UserProfileContainer from "../../features/profileContainer/views/UserProfileContainer"
import UserProfileViewModel from "../../features/profile/viewModels/UserProfileViewModel";
import ChangePasswordViewModel from "../../features/changePassword/viewModels/ChangePasswordViewModel";



export default Object.freeze([
    {
        path:ROUTES.DOCUMENTS, 
        page: <DocumentsListView detailViewModel={new DocumentDetailViewModel()} viewModel={new DocumentsViewModel()}/>, 
        title:Strings.side_bar_documents, 
        icon:""
    },
    {
        path:ROUTES.USERS, 
        page: <UserList/>, 
        title:Strings.side_bar_users, 
        icon:""
    },
    {
        path:ROUTES.PROFILE, 
        page: <UserProfileContainer userViewModel={new UserProfileViewModel()} changePassViewModel={new ChangePasswordViewModel()}/>, 
        title:Strings.side_bar_user_profile, 
        icon:""
    }
]);