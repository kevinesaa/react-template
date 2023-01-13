import Constants from "../../_commons/Constants";

function saveCompanyList(companies) {
    
    if(companies == null) {
        window.localStorage.setItem(Constants.COMPANIES_KEY,null);
        return;
    }
    window.localStorage.setItem(Constants.COMPANIES_KEY,JSON.stringify(companies));
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