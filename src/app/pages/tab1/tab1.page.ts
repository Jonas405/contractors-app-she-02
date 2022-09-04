import { Component } from '@angular/core';import { ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { UserCompanyDetails } from 'src/app/interfaces/userDetails';
import { CounterWorksByStatus } from 'src/app/interfaces/worksDetails';
import { WorksService } from 'src/app/services/works.service';
import { ModalListaDeTrabajosPage } from './modal-lista-de-trabajos/modal-lista-de-trabajos.page';
import { ModalPermisoDeTrabajoPage } from './modal-permiso-de-trabajo/modal-permiso-de-trabajo.page';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {


  userCompanyDetails: UserCompanyDetails;

  counterWorksByStatus : CounterWorksByStatus
  lstCounterWorksByStatus: CounterWorksByStatus[] = []
  constructor(private modalCrtl: ModalController,
              private storage: Storage,
              private navCtrl: NavController,
              private worksService: WorksService) {}

  //Id user from ionic storage
  //idUserFromStorage: string;
  //User details logged
  //userDetails: UsersDetails

  ngOnInit(){

    //Add input variable coming from login for this action with the user id logged
    this.getUserIdFromStorage();
    this.getCounterWorksByStatus()
    // esto es para cuando agreguegemos los usuarios y login
    //this.getUserIdFromStorage();

  }

  getUserIdFromStorage(){
    this.storage.get('idUserFromDb').then((val)=>{
      if(val != null ){
        console.log('Your id from db storage is home ', val);
      // this.idUserFromStorage = val; wait I need implements the login before 
      //In awhile I'll pass fix id param with 5
       this.userDetailsLoggedById(5)
      // this.nextEvents(); refresh the page when pull down
      }else{
        this.navCtrl.navigateRoot('/login');
      }
    })
  }

  userDetailsLoggedById(id){
    this.worksService.getUserDetailsById(id).subscribe((data: UserCompanyDetails)=>{
      this.userCompanyDetails = data[0]
      console.log(this.userCompanyDetails);
      console.log(this.userCompanyDetails.jobManager)
    })
  }

  getCounterWorksByStatus(){
    for (let i = 1; i < 10; i++) {
    this.worksService.getMissionPostDetailsByIdMission(i).subscribe((data:CounterWorksByStatus)=>{
      this.counterWorksByStatus = data;
      this.lstCounterWorksByStatus.push(this.counterWorksByStatus)
      console.log(data)
    })
    }

    console.log(this.lstCounterWorksByStatus)

  }
  
  async openPermitWorkModal(){
    const modal = await this.modalCrtl.create({
      component: ModalPermisoDeTrabajoPage,
      componentProps:{
      }
    }); 
    await modal.present();
  }


  async openWorkListSelected(statusId,statusName){
    console.log(statusId)
    const modal = await this.modalCrtl.create({
      component: ModalListaDeTrabajosPage,
      componentProps:{
        'statusId': statusId,
        'statusName':statusName
      }
    }); 
    await modal.present();
  }

}
