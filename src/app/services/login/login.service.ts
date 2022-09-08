import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCompanyEmployee } from 'src/app/interfaces/userDetails';
import { environment } from 'src/environments/environment';


const apiKey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class LoginService {

    //url = 'http://localhost:4000/';
    url = apiKey;

    constructor( private http: HttpClient) { }

  getUserDetailsById(id: number){
    return this.http.get<UserCompanyEmployee>(`${this.url}getUserDetails/${id}`)
  }

  
}
