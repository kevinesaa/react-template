
import DocumentsListView from "../../features/documentList/views/DocumentsListView";
import UserList from "../../features/userList/views/UserList";
import UserProfile from "../../features/profile/views/UserProfile";
import DocumentsViewModel from "../../features/documentList/viewModels/DocumentsViewModel";
import DocumentDetailViewModel from "../../features/documentDetails/viewModels/DocumentDetailViewModel";
import ROUTES from "../../_commons/Routes";


export default Object.freeze([
    {
        path:ROUTES.DOCUMENTS, 
        page: <DocumentsListView detailViewModel={new DocumentDetailViewModel()} viewModel={new DocumentsViewModel()}/>, 
        title:"Documentos", 
        icon:""
    },
    {
        path:ROUTES.USERS, 
        page: <UserList/>, 
        title:"Usuarios", 
        icon:""
    },
    {
        path:ROUTES.PROFILE, 
        page: <UserProfile/>, 
        title:"Mi perfil", 
        icon:""
    }
]);