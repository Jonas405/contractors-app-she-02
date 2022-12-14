export class NewWorkRequestModel{
    companyId?:                 number;
    nameJobManagerByCompany?:   string;
    emailJobManagerByCompany?:  string;
    workSignatureDir:           string;
    agencyId?:                  number;
    area?:                      string;
    initDate?:                  string;
    endDate?:                   string;   
    createdAt?:                 string;
    workDescription?:           string;
    workRiskDescription?:       string;
    workTitle?:                 string;
    workTypes?:                 number;
    workRequestStatusId?:       number;
    specialRecomendations?:     string;
    companyUserId: number;
}


export class RelationWorkRequestEmployeeTypeModel{
    workRequestId?:             number;
    workEmployeeTypeId?:        number;
}

export class RelationWorkRequestMandatoryMeasureModel{
    workRequestId?:             number;
    mandatoryMeasureId?:        number;
}

export class WorkRequestRelationUserCompanyEmployeeModel{
    workRequestId?:             number;
    userCompanyEmployeeId?:        number;
}

export class NewEvidenceModel{
    workRequestId?:             number;
    userCompanyEmployeeId?:        number;
    comment?:     string;
    details?:   string;
    date?:      string;
    dirEvidenceFile?:   string;

}

export class NewWorkRequestRelationMandatoryMeasureValidationSupplySshe{
    relationWorkRequestMandatoryMeasureId: number;
    validationSupply: number;
    validationSshe: number;
    mandatoryMeasuresDetailsId: number;
    mandatoryMeasuresId: number;
    mandatoryMeasuresOptionId: number;
  }
    

  export class SelectedAnswer {
    question:number;
    anwser: number;
  }

  export class NewEvaluation{
    id: number;
    questionId: number;
    answerId: number;
    scoring: number;
    workRequestId: number;
    userCompanyEmployeeId: number;
    date:string;
}

export class ApprovedMeasure {
    id:number;
    workRequestId: number;
    unileverEmployeeId: number;
    mandatoryMeasureDetailsId: number;
    measureStatus: number;
    jobRoleId: number
}