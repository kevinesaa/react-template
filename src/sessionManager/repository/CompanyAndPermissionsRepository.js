import CompanyRepository from "./CompanyRepository";
import PermissionRepository from "./PermissionsRepository";


function getCompaniesByPermissons(arrPermissionsId) {
    
    const group = 
        PermissionRepository
            .getPermissionList()
            .filter(item => arrPermissionsId.includes(item.permission_id) )
            .map(item => item.company_id);
                
    const companies = CompanyRepository
        .getCompanyList()
        .filter(item => group.includes(item.id));
    
    return companies;
}

const CompanyAndPermissionsRepository = Object.freeze({
    getCompaniesByPermissons
});

export default CompanyAndPermissionsRepository;