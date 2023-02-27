import axios from 'axios';
import API_END_POINTS from '../../../_commons/Api';


 async function getPermissionsList(requestModel) {

    const url = API_END_POINTS.GET_PERMISSIONS_LIST;
    
    try{
        
        const response = await axios.get(url, { 
            headers:{
                "Authorization": `Bearer ${requestModel.token}`,
                "Content-Type": "application/json"
            }
        });
        
        return response;
    }
    catch(error) {
        console.error(error);
        return error.response;
    }
}


const AllUserPermissionsRepository = Object.freeze({
    getPermissionsList,
    
});

export default AllUserPermissionsRepository;