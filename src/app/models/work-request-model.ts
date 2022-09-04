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
    title?:     string;
    details?:   string;
    date?:      string;
    dirEvidence?:   string;

}

export class NewWorkRequestRelationMandatoryMeasureValidationSupplySshe{
    relationWorkRequestMandatoryMeasureId: number;
    validationSupply: number;
    validationSshe: number;
    mandatoryMeasuresDetailsId: number;
    mandatoryMeasuresId: number;
    mandatoryMeasuresOptionId: number;
  }
    




