import { Component } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserCompanyDetails } from 'src/app/interfaces/userDetails';
import { WorksService } from 'src/app/services/works.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  userCompanyDetails: UserCompanyDetails;
  lstNotification = []
    //I'll initializing the user type logged here for in the ngoinit draw the view
  //userTypeLogged : string;
  //Comment or uncomment typelogged for appear the button
  userTypeLogged = "company_manager";
  drawerViewByUserTypeLogged : number;
  userId;
  constructor(private modalCrtl: ModalController,
    private storage: Storage,
    private navCtrl: NavController,
    private worksService: WorksService) {}

  ngOnInit(){

    this.lstNotification = []

    //Param commin from user logged where I'll check if are job manager company o just employee company
    if(this.userTypeLogged == 'company_manager') this.drawerViewByUserTypeLogged = 1

    //Add input variable coming from login for this action with the user id logged
    this.getUserIdFromStorage();

  }

    //Refresh page profile 
    doRefresh(refresher) {
      console.log('Begin async operation', refresher);
  
      setTimeout(() => {
        this.ngOnInit()
        refresher.target.complete();
      }, 2000);
    }

  getUserIdFromStorage(){
    this.storage.get('idUserFromDb').then((val)=>{
      if(val != null ){
        console.log('Your id from db storage is home ', val);
        this.userId = val;
      // this.idUserFromStorage = val; wait I need implements the login before 
      //In awhile I'll pass fix id param with 5
       this.userDetailsLoggedById(val)
       this.getNotificationsByUserEmployeeId(val)
      // this.nextEvents(); refresh the page when pull down
      }else{
        this.navCtrl.navigateRoot('/login');
      }
    })
  }

  getNotificationsByUserEmployeeId(id){
    this.worksService.getNotificationsByUserEmployeeId(id).subscribe((data)=>{
      data.forEach(element => {
        this.lstNotification.push(element)
      });
    })

    console.log(this.lstNotification)
  }

  userDetailsLoggedById(id){
    this.worksService.getUserDetailsById(id).subscribe((data: UserCompanyDetails)=>{
      this.userCompanyDetails = data[0]
      console.log(this.userCompanyDetails);
      console.log(this.userCompanyDetails.jobManager)
    })
  }

}
