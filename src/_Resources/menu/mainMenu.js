
import DocumentsListView from "../../features/documentList/views/DocumentsListView";
import T2 from "../../features/userList/views/t2";
import T3 from "../../features/profile/views/t3";
import DocumentsViewModel from "../../features/documentList/viewModels/DocumentsViewModel";


export default Object.freeze([
    {
        path:'/', 
        page: <DocumentsListView viewModel={new DocumentsViewModel()}/>, 
        title:"Documentos", 
        icon:""
    },
    {
        path:'/t2', 
        page: <T2/>, 
        title:"Usuarios", 
        icon:""
    },
    {
        path:'/t3', 
        page: <T3/>, 
        title:"Mi perfil", 
        icon:""
    }
]);