import { Component } from '@angular/core';import { ModalController } from '@ionic/angular';
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

  counterWorksByStatus : CounterWorksByStatus
  lstCounterWorksByStatus: CounterWorksByStatus[] = []
  constructor(private modalCrtl: ModalController,
              private worksService: WorksService) {}

  //Id user from ionic storage
  //idUserFromStorage: string;
  //User details logged
  //userDetails: UsersDetails

  ngOnInit(){

    this.getCounterWorksByStatus()
    // esto es para cuando agreguegemos los usuarios y login
    //this.getUserIdFromStorage();

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
