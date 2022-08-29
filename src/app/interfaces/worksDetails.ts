export interface CounterWorksByStatus {
    pendingWorks: number;
    statusName: string;
    statusId: number
  }

  export interface WorkRequestByStatus {
    workRequestId: number;
    workRequestTitle: string;
    workRequestInitDate: string;
    workRequestEndDate: string;
    workRequestCreatedAt: string;
    workRequestAgency: number;
    workRequestArea: string;
    statusId: number;
    agencyName: string;
  }


  export interface Agencies {
    agencyId: number;
    agencyName: string;
  }

  export interface WorkEmployeeTypes {
    workEmployeeTypeid: number;
    workEmployeeTypeName: string;
  }

  export interface UserEmployeeCompany {
    employeeId: number,
    employeeName: string,
    employeeLastName: string,
    employeeRfc: string,
    jobRole: string,
    companyName: string
  }

 export interface PostEvidence{
    id: number;
    dirEvidence: number;
    title: number;
    details: string;
    date: string;
    dirPost: string;
    dirPostExt: string;
 }
  

