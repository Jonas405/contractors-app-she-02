import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalCapacitacionesPage } from '../modal-capacitaciones/modal-capacitaciones.page';
import { ModalDetalleDeTrabajoFotosPage } from '../modal-detalle-de-trabajo-fotos/modal-detalle-de-trabajo-fotos.page';
import { ModalDetalleDeTrabajoListaEmpleadosPage } from '../modal-detalle-de-trabajo-lista-empleados/modal-detalle-de-trabajo-lista-empleados.page';
import { ModalDetalleDeTrabajoRiesgosPage } from '../modal-detalle-de-trabajo-riesgos/modal-detalle-de-trabajo-riesgos.page';
import { ModalMedidasFotosPage } from '../modal-medidas-fotos/modal-medidas-fotos.page';

@Component({
  selector: 'app-modal-detalles-de-trabajo',
  templateUrl: './modal-detalles-de-trabajo.page.html',
  styleUrls: ['./modal-detalles-de-trabajo.page.scss'],
})
export class ModalDetallesDeTrabajoPage implements OnInit {

  //When work request has already approved all the employees need take a training before start the job
  constructor(private modalCrtl: ModalController) { }

  ngOnInit() {
  }

  async openModalWorkDetailsEmployeeList(){
    const modal = await this.modalCrtl.create({
      component: ModalDetalleDeTrabajoListaEmpleadosPage,
      componentProps:{
      }
    }); 
    await modal.present();
  }

  async openModalWorkDetailsPictures(){
    const modal = await this.modalCrtl.create({
      component: ModalDetalleDeTrabajoFotosPage,
      componentProps:{
      }
    }); 
    await modal.present();
  }

  async openModalWorkDetailsRisks(){
    const modal = await this.modalCrtl.create({
      component: ModalDetalleDeTrabajoRiesgosPage,
      componentProps:{
      }
    }); 
    await modal.present();
  }

    // go to upload evidence for begging the job
    async openModalForRecordedVideoAndUploadEvidenceApto(){
    //console.log("enable navigate over all view with the id")
    //console.log(this.workRequestId)
    //console.log(this.selectedMandatoryMeasures)
    const modal = await this.modalCrtl.create({
      component: ModalMedidasFotosPage,
      componentProps:{
       // 'workRequestId' : this.workRequestId,
       // 'selectedMandatoryMeasures' : this.selectedMandatoryMeasures
      }
    }); 
    await modal.present();
  }


  async openModalMandatoryTrainingByWorkType(){
    const modal = await this.modalCrtl.create({
      component: ModalCapacitacionesPage,
      componentProps:{
      }
    }); 
    await modal.present();
  }

}
