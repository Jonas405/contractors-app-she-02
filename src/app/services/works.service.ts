import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Agencies, CounterWorksByStatus, UserEmployeeCompany, WorkEmployeeTypes, WorkRequestByStatus } from '../interfaces/worksDetails';
import { MandatoryMeasureOptions, MandatoryMeasures } from '../interfaces/measuresDetails';
import { NewEvidenceModel, NewWorkRequestModel, RelationWorkRequestEmployeeTypeModel, RelationWorkRequestMandatoryMeasureModel, WorkRequestRelationUserCompanyEmployeeModel } from '../models/work-request-model';
import { TrainingDetails } from '../interfaces/trainingDetails';

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

  //Need adjust to videos share by manu
  getTrainingDetails(){
    return this.http.get<TrainingDetails[]>(`${this.url}getTrainingDetails`)
  }

}
