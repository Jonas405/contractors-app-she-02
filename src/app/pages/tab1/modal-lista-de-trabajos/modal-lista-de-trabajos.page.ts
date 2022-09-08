import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { WorkRequestByStatus } from 'src/app/interfaces/worksDetails';
import { WorksService } from 'src/app/services/works.service';
import { ModalDetallesDeTrabajoPage } from '../modal-detalles-de-trabajo/modal-detalles-de-trabajo.page';

@Component({
  selector: 'app-modal-lista-de-trabajos',
  templateUrl: './modal-lista-de-trabajos.page.html',
  styleUrls: ['./modal-lista-de-trabajos.page.scss'],
})
export class ModalListaDeTrabajosPage implements OnInit {

  @Input() statusId;
  @Input() statusName;

  workRequestLst: WorkRequestByStatus [] = []

  constructor(private modalCrtl: ModalController,
              private worksService: WorksService,
              private navCtrl: NavController) { }

  ngOnInit() {
    this.getWorksDetailsByStatusId(this.statusId)
    console.log(this.statusName)

  }

  getWorksDetailsByStatusId(statusId){
    console.log(statusId)
    

    this.worksService.getWorksDetailsByStatusId(statusId).subscribe((data:WorkRequestByStatus[])=>{
      console.log(data)
      this.workRequestLst = data
      console.log(this.workRequestLst)
      //same solution different approach 
    /*   data.forEach(element => {
        this.workRequestLst.push(element)
      }); */
    })
    
    
  }

  async openSelectedWorkDetails(workRequestId){
    const modal = await this.modalCrtl.create({
      component: ModalDetallesDeTrabajoPage,
      componentProps:{
        'statusId': this.statusId,
        'statusName':this.statusName,
        'workRequestId':workRequestId
      }
    }); 
    await modal.present();
  }


  closeScheduleModal(){
    this.modalCrtl.dismiss();
    this.navCtrl.navigateRoot('/tabs/tab1');
  }

}
