
import DocumentsListView from "../../features/documentList/views/DocumentsListView";
import UserList from "../../features/userList/views/UserList";
import UserProfile from "../../features/profile/views/UserProfile";
import DocumentsViewModel from "../../features/documentList/viewModels/DocumentsViewModel";
import DocumentDetailViewModel from "../../features/documentDetails/viewModels/DocumentDetailViewModel";


export default Object.freeze([
    {
        path:'/', 
        page: <DocumentsListView detailViewModel={new DocumentDetailViewModel()} viewModel={new DocumentsViewModel()}/>, 
        title:"Documentos", 
        icon:""
    },
    {
        path:'/usuarios', 
        page: <UserList/>, 
        title:"Usuarios", 
        icon:""
    },
    {
        path:'/perfil', 
        page: <UserProfile/>, 
        title:"Mi perfil", 
        icon:""
    }
]);