import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { UserCompanyEmployee } from 'src/app/interfaces/userDetails';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

const apiKey = environment.apiKey;


@Injectable({
  providedIn: 'root'
})
export class LoginService {

    //url = 'http://localhost:4000/';
    url = apiKey;

    idUserFromDb: number = null;
    redirectUrl: string;
    @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();

    constructor( private http: HttpClient,
      private storage: Storage,
      private navCtrl: NavController) { }

  getUserDetailsById(id: number){
    return this.http.get<UserCompanyEmployee>(`${this.url}getUserDetails/${id}`)
  }

  userlogin(rfc:string ,password:string) {
    console.log("in the service")
    console.log(password)
    console.log(rfc)
  

    return this.http.post(`${this.url}postLoginUserEmployee`, {rfc,password},  {responseType: 'json'} )
    .pipe(map((resp:any) => {
      console.log("resp")
      console.log(resp)
      console.log(resp[0].id)
      this.setToken(resp[0].id);
      console.log( this.setToken(resp[0].id))
      this.getLoggedInName.emit(true);
      console.log("resp");
      console.log(resp[0].id);

      if(resp[0].id != null){
          this.saveIdUser(resp[0].id);
      }else{
        resp[0].id = null;
        this.storage.clear();
      }
      return resp;
      }
    ));
    }

    //Save token in storage
    async saveIdUser(idUserFromDb: number){
      this.idUserFromDb = idUserFromDb;
      await this.storage.set('idUserFromDb', idUserFromDb);
      this.getIdUserFromDbStorage();
    } 

    getIdUserFromDbStorage(){
        this.storage.get('idUserFromDb').then((val)=>{
          if(val != null ){
            console.log('Your id from db storage is ', val);
          }else{
            this.navCtrl.navigateRoot('/login');
          }
        })  
    }

      //token
  setToken(token: string) {
    localStorage.setItem('token', token);
    }
    getToken() {
    return localStorage.getItem('token');
    }
    deleteToken() {
    localStorage.removeItem('token');
    }
    isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
    return true
    }
    return false;
    }
}
