import Constants from "../../_commons/Constants";

function saveCompanyList(companies) {
    
    if(companies) {
        window.localStorage.setItem(Constants.COMPANIES_KEY,JSON.stringify(companies));
    }
    else {
        window.localStorage.removeItem(Constants.COMPANIES_KEY);
    }
    
}

function getCompanyList() {
    
    let companyAsString = window.localStorage.getItem(Constants.COMPANIES_KEY);
    if(companyAsString == null || String(companyAsString).length <= 0)
    {
        companyAsString = "[]";
    }

    return JSON.parse(companyAsString);
}


const CompanyRepository = Object.freeze({
    getCompanyList,
    saveCompanyList
});

export default CompanyRepository;