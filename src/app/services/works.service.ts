import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Agencies, CounterWorksByStatus, PostNewWorkRequestRelationMandatoryMeasureValidationSupplySshe, UserEmployeeCompany, WorkDetails, WorkEmployeeTypes, WorkRequestByStatus } from '../interfaces/worksDetails';
import { MandatoryMeasureOptions, MandatoryMeasures } from '../interfaces/measuresDetails';
import { ApprovedMeasure, NewEvidenceModel, NewWorkRequestModel, NewWorkRequestRelationMandatoryMeasureValidationSupplySshe, RelationWorkRequestEmployeeTypeModel, RelationWorkRequestMandatoryMeasureModel, WorkRequestRelationUserCompanyEmployeeModel } from '../models/work-request-model';
import { TrainingDetails } from '../interfaces/trainingDetails';
import { UserCompanyDetails } from '../interfaces/userDetails';

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class WorksService {

     // url = 'http://localhost:4000/';
      //api key come from enviroments variables
    url = apiKey;
 

   newPostEmitter = new EventEmitter<NewEvidenceModel>();

  constructor( private http: HttpClient
    ) { }

  //Get user details by id
  getUserDetailsById(id: number){
    return this.http.get<UserCompanyDetails>(`${this.url}getUserDetailsCompanyById/${id}`)
  }

  getMissionPostDetailsByIdMission(id: number){
    return this.http.get<CounterWorksByStatus>(`${this.url}getCounterWorksByStatus/${id}`)
  }

  getWorksDetailsByStatusId(id: number){
    return this.http.get<WorkRequestByStatus[]>(`${this.url}getWorksDetailsByStatusId/${id}`)
  }

  getWorksTypesToDo(){
    return this.http.get<MandatoryMeasures[]>(`${this.url}getWorksTypesToDo`)
  }

  getWorksAgencies(){
    return this.http.get<Agencies[]>(`${this.url}getWorksAgencies`)
  }

  getWorksEmployeeTypes(){
    return this.http.get<WorkEmployeeTypes[]>(`${this.url}getWorksEmployeeTypes`)
  }

  getLastInsertedWorkRequest(){
    return this.http.get(`${this.url}getLastInsertedWorkRequest`)
  }
  
  getLastInsertedWorkRequestRelationMandatoryMeasure(){
    return this.http.get(`${this.url}getLastInsertedWorkRequestRelationMandatoryMeasure`)
  }

  postNewWorkRequestRelationMandatoryMeasureValidationSupplySshe(postNewWorkRelationMeasures: NewWorkRequestRelationMandatoryMeasureValidationSupplySshe){
    return this.http.post(`${this.url}postNewWorkRequestRelationMandatoryMeasureValidationSupplySshe`, postNewWorkRelationMeasures, {responseType: 'text'});
  }
  
  postNewWorkRequest(postNewWorkRequest : NewWorkRequestModel){
    return this.http.post(`${this.url}postNewWorkRequest`, postNewWorkRequest, {responseType: 'text'});
  }  

  postNewWorkRequestRelationEmployeeType(postNewRelationWorkRequestEmployeeTypeModel : RelationWorkRequestEmployeeTypeModel){
    return this.http.post(`${this.url}postNewWorkRequestRelationEmployeeType`, postNewRelationWorkRequestEmployeeTypeModel, {responseType: 'text'});
  } 

  postNewWorkRequestRelationMandatoryMeasure(postNewRelationWorkRequestMandatoryMeasureModel: RelationWorkRequestMandatoryMeasureModel){
    return this.http.post(`${this.url}postNewWorkRequestRelationMandatoryMeasure`, postNewRelationWorkRequestMandatoryMeasureModel, {responseType: 'text'});
  } 

  postNewWorkRequestRelationUserCompanyEmployee(postRelationWorkRequestUserCompanyEmployeeModel : WorkRequestRelationUserCompanyEmployeeModel){
    return this.http.post(`${this.url}postNewWorkRequestRelationUserCompanyEmployee`, postRelationWorkRequestUserCompanyEmployeeModel, {responseType: 'text'});
  } 

 //Mandatory measures options
  getMandatoryMeasureByWorkRequestSelected(id: number){
    return this.http.get<MandatoryMeasureOptions[]>(`${this.url}getMandatoryMeasureByWorkRequestSelected/${id}`)
  }

  //Get workRequest details by id 
  getWorksRequestDetailsById(id: number){
    return this.http.get<WorkDetails[]>(`${this.url}getWorksRequestDetailsById/${id}`)
  }

  

  //Mandatory measure options size for comparision
  getMandatoryMeasureByWorkRequestSelectedForComparision(id: number){
    return this.http.get<MandatoryMeasureOptions[]>(`${this.url}getMandatoryMeasureByWorkRequestSelected/${id}`)
  }
  
  //Get user employees available for a company 
  getUsersEmployeeByCompany(id:number){
    return this.http.get<UserEmployeeCompany[]>(`${this.url}getUsersEmployeeByCompany/${id}`)
  }

  postNewEvidence(newEvidence){
    this.newPostEmitter.emit(newEvidence)
    console.log(newEvidence)
    return this.http.post(`${this.url}postNewEvidence`, newEvidence, {responseType: 'text'});
  }

  postNewEmployeeMedicalEvidence(newEvidence){
    this.newPostEmitter.emit(newEvidence)
    console.log(newEvidence)
    return this.http.post(`${this.url}postNewEmployeeMedicalEvidence`, newEvidence, {responseType: 'text'});
  }

  //post new evaluation
  postNewEvaluation(newEvaluation){
    this.newPostEmitter.emit(newEvaluation)
    console.log(newEvaluation)
    return this.http.post(`${this.url}postNewEvaluation`, newEvaluation, {responseType: 'text'});
  }
  //post new evidence over approved work request advance
  postNewApprovedWorkEvidenceAdvance(newEvidence){
    this.newPostEmitter.emit(newEvidence)
    console.log(newEvidence)
    return this.http.post(`${this.url}postNewApprovedWorkEvidenceAdvance`, newEvidence, {responseType: 'text'});
  }

  //get evaluation scoring by work request and by employee id 
 //Get user employees available for a company 
 getEvaluationScoringByWorkRequestAndEmployeeId(workRequestId:number,employeeId:number){
  return this.http.get(`${this.url}getEvaluationScoringByWorkRequestAndEmployeeId/${workRequestId}/${employeeId}`)
}

getMandatoryMedicalStatusByWorkRequestAndEmployeeId(workRequestId:number,employeeId:number){
  return this.http.get<[]>(`${this.url}getMandatoryMedicalStatusByWorkRequestAndEmployeeId/${workRequestId}/${employeeId}`)
}

getAdvanceEvidenceUploadByWorkRequest(workRequestId:number){
  return this.http.get<[]>(`${this.url}getAdvanceEvidenceUploadByWorkRequest/${workRequestId}`)
}
 
  //Need adjust to videos share by manu
  getTrainingDetails(){
    return this.http.get<TrainingDetails[]>(`${this.url}getTrainingDetails`)
  }

  //get top 20 notifications
  getNotificationsByUserEmployeeId(employeeId:number){
    return this.http.get<[]>(`${this.url}getNotificationsByUserEmployeeId/${employeeId}`)
  }

  getWorkRequestByEmployeeId(employeeId:number){
    return this.http.get<[]>(`${this.url}getWorkRequestByEmployeeId/${employeeId}`)
  }

  //Post new work request approbation from VENTAS 
  postMeasuresForEvaluationVentas(postMeasuresForEvaluationVentas: ApprovedMeasure){
    return this.http.post(`${this.url}postMeasuresForEvaluationVentas`, postMeasuresForEvaluationVentas, {responseType: 'text'});
  }

    //Post new work request approbation from VENTAS 
  postMeasuresForEvaluationSupply(postMeasuresForEvaluationSupply: ApprovedMeasure){
    return this.http.post(`${this.url}postMeasuresForEvaluationSupply`, postMeasuresForEvaluationSupply, {responseType: 'text'});
  }

  //Post new work request approbation from VENTAS 
  postMeasuresForEvaluationSSHE(postMeasuresForEvaluationSSHE: ApprovedMeasure){
    return this.http.post(`${this.url}postMeasuresForEvaluationSSHE`, postMeasuresForEvaluationSSHE, {responseType: 'text'});
  }
  
  
  

}
