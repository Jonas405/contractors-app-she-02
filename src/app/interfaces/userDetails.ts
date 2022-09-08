export interface UserCompanyDetails{ 
    jobManagerCompanyUserId: number,
    jobManager: string;
    jobManagerRfc: string;
    jobManagerEmail: string;
    jobManagerpassword: string;
    companyId: number;
    companyName: string;
    companyEmail: string;
    companyRfc: string;
    companyPassword: string;
}

export interface UserCompanyEmployee{
        id	: number;
        name: string;	
        surname	: string;
        rfc	: string;
        email	: string;
        password	: string;
        createdAt	: string;
        companyId	: number
        companyName: string;
        companyEmployeeJobRoleId	: number
        companyEmployeeJobRole: string
        location: string;
}