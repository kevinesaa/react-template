
import DocumentsListView from "../../features/documentsList/views/DocumentsListView";
import T2 from "../../features/home/views/t2";
import T3 from "../../features/home/views/t3";


export default Object.freeze([
    {
        path:'/', page: <DocumentsListView/>, title:"home", icon:""
    },
    {
        path:'/t2', page: <T2/>, title:"test 2", icon:""
    },
    {
        path:'/t3', page: <T3/>, title:"test 3", icon:""
    }
]);